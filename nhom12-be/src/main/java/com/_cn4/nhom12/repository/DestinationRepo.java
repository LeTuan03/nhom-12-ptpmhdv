package com._cn4.nhom12.repository;

import com._cn4.nhom12.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DestinationRepo extends JpaRepository<Destination, String> {
    @Query("SELECT d FROM Destination d WHERE " +
            "(:destinationName IS NULL OR LOWER(d.name) LIKE LOWER(CONCAT('%', :destinationName, '%'))) AND " +
            "(:cityName IS NULL OR LOWER(d.city.name) LIKE LOWER(CONCAT('%', :cityName, '%'))) AND " +
            "(:countryName IS NULL OR LOWER(d.country.name) LIKE LOWER(CONCAT('%', :countryName, '%'))) AND " +
            "(:continentName IS NULL OR LOWER(d.continent.name) LIKE LOWER(CONCAT('%', :continentName, '%')))")
    List<Destination> search(
            @Param("destinationName") String destinationName,
            @Param("cityName") String cityName,
            @Param("countryName") String countryName,
            @Param("continentName") String continentName
    );

}
