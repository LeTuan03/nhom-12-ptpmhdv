package com._cn4.nhom12.repository;

import com._cn4.nhom12.entity.Booking;
import com._cn4.nhom12.entity.Continents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContinentsRepo extends JpaRepository<Continents, String> {
    @Query("SELECT p FROM Continents p WHERE " +
            "(:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) ")
    List<Continents> searchByName(@Param("name") String name);
}
