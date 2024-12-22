package com._cn4.nhom12.repository;

import com._cn4.nhom12.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepo extends JpaRepository<Account, String> {
    Optional<Account> findByUsername(String username);
    boolean existsByEmail(String email);
}
