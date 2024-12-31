package com._cn4.nhom12.utility;

import com._cn4.nhom12.entity.Account;
import com._cn4.nhom12.enums.Constant;
import com._cn4.nhom12.repository.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AccountRepo accountRepository;


    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public void run(String... args) {
        if (!(accountRepository.existsByRole(Constant.ROLE_SUPER_ADMIN) && accountRepository.existsByUsername("superadmin") && accountRepository.existsByEmail("superadmin@gmail.com"))) {
            Account entity = new Account();
            entity.setRole(Constant.ROLE_SUPER_ADMIN);
            entity.setUsername("superadmin");
            entity.setEmail("superadmin@gmail.com");
            entity.setPassword(passwordEncoder.encode("12345"));
            entity.setCreatedDate(LocalDate.now());
            accountRepository.save(entity);
            System.out.println("Created spadmin");
        }
    }
}
