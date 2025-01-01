package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.DTO.ApiResponse;
import com._cn4.nhom12.DTO.request.AccountCreationRequest;
import com._cn4.nhom12.DTO.request.AccountUpdateRequest;
import com._cn4.nhom12.DTO.request.LoginRequest;
import com._cn4.nhom12.entity.Account;
import com._cn4.nhom12.repository.AccountRepo;
import com._cn4.nhom12.services.AccountService;
import com._cn4.nhom12.utility.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepo accountRepo;

    private void setValueDtos(Account entity, AccountCreationRequest request) {
        entity.setName(request.getName());
        entity.setBirthday(request.getBirthday());
        entity.setPhone(request.getPhone());
        entity.setEmail(request.getEmail());
        entity.setGender(request.getGender());
        entity.setAvatar(request.getAvatar());
        entity.setUsername(request.getUsername());
        entity.setRole(request.getRole());
    }

    @Override
    public ResponseEntity<Account> createAccount(AccountCreationRequest request) {
        Account entity = new Account();
        this.setValueDtos(entity, request);
        entity.setPassword(request.getPassword());
        return new ResponseEntity<>(accountRepo.save(entity), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Account>> getAllAccount() {
        return new ResponseEntity<>(accountRepo.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Account> getAccount(String id) {

        Optional<Account> itemExist = accountRepo.findById(id);
        Account entity = itemExist.get();

        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Account> getAccountByToken(String authorizationHeader) {
        System.out.println(authorizationHeader);
        try {
            // Kiểm tra và lấy token từ header
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                throw new IllegalArgumentException("Missing or invalid Authorization header");
            }

            // Loại bỏ tiền tố "Bearer " để lấy token
            String token = authorizationHeader.substring(7);

            // Xác thực và giải mã token
            Claims claims = JwtUtil.validateToken(token);
            if (claims == null) {
                throw new IllegalArgumentException("Token không hợp lệ hoặc đã hết hạn.");
            }

            // Trích xuất thông tin từ token
            String username = claims.getSubject();

            // Truy vấn thông tin tài khoản từ cơ sở dữ liệu
            Optional<Account> account = accountRepo.findByUsername(username);
            if (account.isEmpty()) {
                throw new IllegalArgumentException("Không tìm thấy tài khoản với username: " + username);
            }

            return ResponseEntity.ok(account.get());

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public ResponseEntity<Account> updateAccount(AccountCreationRequest request, String id) {
        if(Objects.isNull(request.getUsername()) || request.getUsername() == "") {
            throw new RuntimeException("Vui lòng nhập đầy đủ thông tin");
        }
        Optional<Account> itemExist = accountRepo.findById(id);
        Account entity = itemExist.get();
        this.setValueDtos(entity, request);
        accountRepo.save(entity);
        return new ResponseEntity<>(accountRepo.save(entity), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteAccount(String id) {
        accountRepo.deleteById(id);
        return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
    }

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public ApiResponse<Account> register(AccountCreationRequest request) {
//        if(Objects.isNull(request.getUsername()) || request.getUsername() == "") {
//            throw new RuntimeException("Vui lòng nhập đầy đủ thông tin");
//        }
        if (accountRepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }
        if (accountRepo.existsByUsername(request.getUsername())){
            throw new RuntimeException("Username đã tồn tại");
        }
        Account entity = new Account();
        this.setValueDtos(entity, request);
        entity.setPassword(passwordEncoder.encode(request.getPassword()));
        ApiResponse response = new ApiResponse<>();
        response.setData(accountRepo.save(entity));
        response.setMessage("Đăng ký thành công tài khoản");
        return response;
    }

    @Override
    public ResponseEntity<?> login(LoginRequest request) {
        Account account = accountRepo.findByUsername(request.getUsername()).orElse(null);
        if (account != null && passwordEncoder.matches(request.getPassword(), account.getPassword())) {
            String token = JwtUtil.generateToken(account.getUsername(), account.getRole());
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        return new ResponseEntity<>("Tên tài khoản hoặc mật khẩu không đúng.", HttpStatus.BAD_REQUEST);
    }

    @Override
    public List<Account> searchByUsername(String username) {
        return accountRepo.searchByUsername(username);
    }
}
