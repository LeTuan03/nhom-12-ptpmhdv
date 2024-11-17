package com._cn4.nhom12.repository;

import com._cn4.nhom12.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepo extends JpaRepository<Account, String> {
}
