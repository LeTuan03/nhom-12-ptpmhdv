package com._cn4.nhom12.repository;

import com._cn4.nhom12.entity.TourType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourTypeRepo extends JpaRepository<TourType, String> {
    List<TourType> findNameContainingIgnoreCase(String name);
    List<TourType> findByName(String name);
}
