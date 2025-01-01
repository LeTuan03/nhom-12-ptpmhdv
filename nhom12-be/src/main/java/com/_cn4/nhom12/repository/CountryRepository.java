package com._cn4.nhom12.repository;

import com._cn4.nhom12.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CountryRepository extends JpaRepository<Country, String> {
    @Query("SELECT p FROM Country p WHERE " +
            "(:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) ")
    List<Country> searchByName(@Param("name") String name);
}