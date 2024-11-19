package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.DTO.request.AccountCreationRequest;
import com._cn4.nhom12.DTO.request.LoginRequest;
import com._cn4.nhom12.entity.Account;
import com._cn4.nhom12.repository.AccountRepo;
import com._cn4.nhom12.services.AccountService;
import com._cn4.nhom12.utility.JwtUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public ResponseEntity<Account> updateAccount(AccountCreationRequest request, String id) {
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
    public ResponseEntity<Account> register(AccountCreationRequest request) {
        Account entity = new Account();
        this.setValueDtos(entity, request);
        entity.setPassword(passwordEncoder.encode(request.getPassword()));
        return new ResponseEntity<>(accountRepo.save(entity), HttpStatus.OK);
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
}
