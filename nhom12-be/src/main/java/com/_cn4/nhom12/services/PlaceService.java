package com._cn4.nhom12.services;


import com._cn4.nhom12.entity.Place;

import java.util.List;

public interface PlaceService {
    List<Place> getPlacesByDestination(String destinationId);
    List<Place> getAllPlaces();
    Place getPlaceById(String id);
    Place createPlace(Place place);
    Place updatePlace(String id, Place updatedPlace);
    void deletePlace(String id);
}
