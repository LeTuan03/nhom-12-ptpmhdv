package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.DTO.request.AccountCreationRequest;
import com._cn4.nhom12.entity.Account;
import com._cn4.nhom12.entity.Vehicle;
import com._cn4.nhom12.repository.AccountRepo;
import com._cn4.nhom12.services.AccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    private void setValueDtos(Account entity, Account request) {
        if (!Objects.isNull(request.getId())) {

            entity.setId(request.getId());
        }
        entity.setName(request.getName());
        entity.setBirthday(request.getBirthday());
        entity.setPhone(request.getPhone());
        entity.setEmail(request.getEmail());
        entity.setGender(request.getGender());
    }

    @Override
    public ResponseEntity<Account> createAccount(AccountCreationRequest account) {
        Account Account = new Account();
        Account.setName(account.getName());
        Account.setPassword(account.getPassword());
        Account.setEmail(account.getEmail());
        Account.setPhone(account.getPhone());
        Account.setBirthday(account.getBirthday());
        Account.setGender(account.getGender());

        return new ResponseEntity<>(accountRepo.save(Account), HttpStatus.OK);
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
    public ResponseEntity<Account> updateAccount(Account request) {
        Optional<Account> itemExist = accountRepo.findById(request.getId());
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
}
