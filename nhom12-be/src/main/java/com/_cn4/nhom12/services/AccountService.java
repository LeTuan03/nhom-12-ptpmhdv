package com._cn4.nhom12.services;

import com._cn4.nhom12.DTO.ApiResponse;
import com._cn4.nhom12.DTO.request.AccountCreationRequest;
import com._cn4.nhom12.DTO.request.LoginRequest;
import com._cn4.nhom12.entity.Account;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AccountService {
    ResponseEntity<Account> createAccount(AccountCreationRequest request);

    ResponseEntity<List<Account>> getAllAccount();

    ResponseEntity<Account> getAccount(String id);
    ResponseEntity<Account> getAccountByToken(String token);

    ResponseEntity<Account> updateAccount(AccountCreationRequest request, String id);

    ResponseEntity<String> deleteAccount(String id);

    ApiResponse<Account> register(AccountCreationRequest request);

    ResponseEntity<?> login(LoginRequest request);
    List<Account> searchByUsername(String username);
    String changePassword(String username, String oldPassword, String newPassword);
}