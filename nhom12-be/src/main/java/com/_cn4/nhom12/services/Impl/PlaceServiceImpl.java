package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.entity.Destination;
import com._cn4.nhom12.entity.Place;
import com._cn4.nhom12.repository.DestinationRepo;
import com._cn4.nhom12.repository.PlaceRepo;
import com._cn4.nhom12.services.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceServiceImpl implements PlaceService {

    @Autowired
    private PlaceRepo placeRepository;

    @Autowired
    private DestinationRepo destinationRepository;

    @Override
    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    @Override
    public Place getPlaceById(String id) {
        return placeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Place with ID " + id + " not found!"));
    }

    @Override
    public Place createPlace(Place place) {
        // Kiểm tra nếu `Place` có liên kết với một `Destination`
        if (place.getDestination() != null && place.getDestination().getId() != null) {
            Destination destination = destinationRepository.findById(place.getDestination().getId())
                    .orElseThrow(() -> new RuntimeException("Destination with ID " + place.getDestination().getId() + " not found!"));
            place.setDestination(destination);
        }
        return placeRepository.save(place);
    }

    @Override
    public Place updatePlace(String id, Place updatedPlace) {
        Place existingPlace = getPlaceById(id);
        existingPlace.setName(updatedPlace.getName());
        existingPlace.setImageUrl(updatedPlace.getImageUrl());
        existingPlace.setPricePerPerson(updatedPlace.getPricePerPerson());

        // Cập nhật `Destination` nếu có
        if (updatedPlace.getDestination() != null && updatedPlace.getDestination().getId() != null) {
            Destination destination = destinationRepository.findById(updatedPlace.getDestination().getId())
                    .orElseThrow(() -> new RuntimeException("Destination with ID " + updatedPlace.getDestination().getId() + " not found!"));
            existingPlace.setDestination(destination);
        }

        return placeRepository.save(existingPlace);
    }

    @Override
    public void deletePlace(String id) {
        Place place = getPlaceById(id);
        // Kiểm tra nếu cần xử lý trước khi xóa (nếu có booking liên quan)
        placeRepository.delete(place);
    }

    @Override
    public List<Place> getPlacesByDestination(String destinationId) {
        Destination destination = destinationRepository.findById(destinationId)
                .orElseThrow(() -> new RuntimeException("Destination with ID " + destinationId + " not found!"));
        return placeRepository.findByDestinationId(destination.getId());
    }
}
