package com._cn4.nhom12.services;


import com._cn4.nhom12.DTO.request.PlaceRequest;
import com._cn4.nhom12.entity.Place;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PlaceService {
    List<Place> getPlacesByDestination(String destinationId);
    List<Place> getAllPlaces();
    Place getPlaceById(String id);
    Place createPlace(PlaceRequest place);
    Place updatePlace(String id, PlaceRequest updatedPlace);
    void deletePlace(String id);
    List<Place> getPlacesByIds(List<String> ids);
    List<Place> searchByName(String name);
}
