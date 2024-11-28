package com._cn4.nhom12.repository;

import com._cn4.nhom12.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, String> {
}