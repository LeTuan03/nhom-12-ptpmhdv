package com._cn4.nhom12.repository;


import com._cn4.nhom12.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepo extends JpaRepository<Place, String> {
    List<Place> findByDestinationId(String destinationId);
}
