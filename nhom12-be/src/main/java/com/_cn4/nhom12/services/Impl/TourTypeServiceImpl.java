package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.entity.TourType;
import com._cn4.nhom12.repository.TourTypeRepo;
import com._cn4.nhom12.services.TourTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TourTypeServiceImpl implements TourTypeService {

    @Autowired
    private TourTypeRepo tourTypeRepo;

    @Override
    public List<TourType> searchTourTypes(String name) {
        return tourTypeRepo.findNameContainingIgnoreCase(name);
    }
    public TourTypeServiceImpl(TourTypeRepo tourTypeRepo) {
        this.tourTypeRepo = tourTypeRepo;
    }

    @Override
    public List<TourType> getAllTourTypes() {
        return tourTypeRepo.findAll();
    }

    @Override
    public TourType getTourTypeById(String id) {
        return tourTypeRepo.findById(id).orElseThrow(() ->
                new RuntimeException("TourType not found with Id: " + id)
        );
    }

    @Override
    public TourType createTourType(TourType tourType) {
        return tourTypeRepo.save(tourType);
    }

    @Override
    public TourType updateTourType(String id, TourType tourTypeDetails) {

        TourType existingTourType = getTourTypeById(id);
        existingTourType.setName(tourTypeDetails.getName());
        return tourTypeRepo.save(existingTourType);
    }

    @Override
    public ResponseEntity<String> deleteTourType(String id) {

        TourType existingTourType = getTourTypeById(id);
        tourTypeRepo.delete(existingTourType);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("TourType with id " + id + " has been deleted successfully.");
    }
}
