package com._cn4.nhom12.controller;

import com._cn4.nhom12.DTO.ApiResponse;
import com._cn4.nhom12.DTO.request.AccountCreationRequest;
import com._cn4.nhom12.DTO.request.LoginRequest;
import com._cn4.nhom12.entity.Account;
import com._cn4.nhom12.enums.Constant;
import com._cn4.nhom12.services.Impl.AccountServiceImpl;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/account")
@Validated
public class AccountController {
    @Autowired
    private AccountServiceImpl accountService;

    @PostMapping("/create")
    @Secured({Constant.ROLE_SUPER_ADMIN, Constant.ROLE_ADMIN})
    ResponseEntity<Account> createAccount(@RequestBody @Valid AccountCreationRequest request) {
        return accountService.createAccount(request);
    }
    @GetMapping
    @Secured({Constant.ROLE_SUPER_ADMIN, Constant.ROLE_ADMIN})
    ResponseEntity<List<Account>> getAllAccount() {
        return accountService.getAllAccount();
    }

    @PutMapping("/{id}")
    @Secured({Constant.ROLE_SUPER_ADMIN, Constant.ROLE_ADMIN, Constant.ROLE_USER})
    ResponseEntity<Account> update(@RequestBody AccountCreationRequest request, @PathVariable String id) {
        return accountService.updateAccount(request, id);
    }

    @DeleteMapping("/{id}")
    @Secured({Constant.ROLE_SUPER_ADMIN, Constant.ROLE_ADMIN})
    ResponseEntity<String> deleteById(@PathVariable String id) {
        return accountService.deleteAccount(id);
    }

    @GetMapping("/{id}")
    ResponseEntity<Account> getById(@PathVariable String id) {
        return accountService.getAccount(id);
    }

    @PostMapping("/register")
    ApiResponse<Account> register(@RequestBody @Valid AccountCreationRequest request) {
        return accountService.register(request);
    }

    @PostMapping("/login")
    ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return accountService.login(request);
    }
    @GetMapping("/get-info")
    ResponseEntity<Account> getInfo(@RequestHeader("Authorization") String authorizationHeader) {
        return accountService.getAccountByToken(authorizationHeader);
    }
}
