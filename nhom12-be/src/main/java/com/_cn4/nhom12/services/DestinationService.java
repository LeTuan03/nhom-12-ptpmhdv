package com._cn4.nhom12.services;

import com._cn4.nhom12.DTO.request.DestinationRequest;
import com._cn4.nhom12.entity.Continents;
import com._cn4.nhom12.entity.Destination;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface DestinationService {
    List<Destination> getAll();

    List<Destination> search(  String destinationName,
                                               String cityName,
                                               String countryName,
                                               String continentName);

    ResponseEntity<Destination> create(DestinationRequest request);
    ResponseEntity<Destination> getById(String id);

    ResponseEntity<Destination> update(DestinationRequest request, String id);
    ResponseEntity<String> delete(String id);
}
