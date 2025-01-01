package com._cn4.nhom12.repository;


import com._cn4.nhom12.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepo extends JpaRepository<Place, String> {
    List<Place> findByDestinationId(String destinationId);

    List<Place> findByIdIn(List<String> ids);

    @Query("SELECT p FROM Place p WHERE " +
            "(:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) ")
    List<Place> search(@Param("name") String name);

}
