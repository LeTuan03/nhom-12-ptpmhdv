package com._cn4.nhom12.services;

import com._cn4.nhom12.entity.Continents;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ContinentsService {

    List<Continents> getAllContinents();
    List<Continents> searchContinents(String name);

    ResponseEntity<Continents> createContinents(Continents request);
    ResponseEntity<Continents> getContinents(String id);

    ResponseEntity<Continents> updateContinents(Continents request);
    ResponseEntity<String> deleteContinents(String id);

}
