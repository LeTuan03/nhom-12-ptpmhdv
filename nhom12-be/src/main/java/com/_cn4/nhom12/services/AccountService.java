package com._cn4.nhom12.services;

import com._cn4.nhom12.DTO.request.AccountCreationRequest;
import com._cn4.nhom12.entity.Account;
import com._cn4.nhom12.entity.Vehicle;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AccountService {
    ResponseEntity<Account> createAccount(AccountCreationRequest request);
    ResponseEntity<List<Account>> getAllAccount();
    ResponseEntity<Account> getAccount(String id);

    ResponseEntity<Account> updateAccount(Account request);
    ResponseEntity<String> deleteAccount(String id);
}
