package com._cn4.nhom12.services;

import com._cn4.nhom12.entity.TourType;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TourTypeService {
    List<TourType> getAllTourTypes();
    List<TourType> searchTourTypes(String name);
    TourType getTourTypeById(String id);
    TourType createTourType(TourType tourType);
    TourType updateTourType(String id, TourType tourType);
    ResponseEntity<String> deleteTourType(String id);

}
