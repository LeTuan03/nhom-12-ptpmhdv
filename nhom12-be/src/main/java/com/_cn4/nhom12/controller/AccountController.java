package com._cn4.nhom12.controller;

import com._cn4.nhom12.DTO.request.AccountCreationRequest;
import com._cn4.nhom12.DTO.request.LoginRequest;
import com._cn4.nhom12.entity.Account;
import com._cn4.nhom12.entity.Vehicle;
import com._cn4.nhom12.services.Impl.AccountServiceImpl;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountServiceImpl accountService;

    @PostMapping("/create")
    ResponseEntity<Account> createAccount(@RequestBody AccountCreationRequest request) {
        return accountService.createAccount(request);
    }
    @GetMapping
    ResponseEntity<List<Account>> getAllAccount() {
        return accountService.getAllAccount();
    }

    @PutMapping("/{id}")
    ResponseEntity<Account> update(@RequestBody AccountCreationRequest request, @PathVariable String id) {
        return accountService.updateAccount(request, id);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteById(@PathVariable String id) {
        return accountService.deleteAccount(id);
    }

    @GetMapping("/{id}")
    ResponseEntity<Account> getById(@PathVariable String id) {
        return accountService.getAccount(id);
    }

    @PostMapping("/register")
    ResponseEntity<Account> register(@RequestBody AccountCreationRequest request) {
        return accountService.register(request);
    }

    @PostMapping("/login")
    ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return accountService.login(request);
    }
}
