package com._cn4.nhom12.services;

import com._cn4.nhom12.DTO.request.AccountCreationRequest;
import com._cn4.nhom12.DTO.request.LoginRequest;
import com._cn4.nhom12.entity.Account;
import com._cn4.nhom12.entity.Vehicle;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AccountService {
    ResponseEntity<Account> createAccount(AccountCreationRequest request);

    ResponseEntity<List<Account>> getAllAccount();

    ResponseEntity<Account> getAccount(String id);

    ResponseEntity<Account> updateAccount(AccountCreationRequest request, String id);

    ResponseEntity<String> deleteAccount(String id);

    ResponseEntity<Account> register(AccountCreationRequest request);

    ResponseEntity<?> login(LoginRequest request);
}