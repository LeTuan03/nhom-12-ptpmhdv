package com._cn4.nhom12.repository;

import com._cn4.nhom12.entity.Continents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContinentsRepo extends JpaRepository<Continents, String> {
    List<Continents> findByNameContainingIgnoreCase(String name);
}
