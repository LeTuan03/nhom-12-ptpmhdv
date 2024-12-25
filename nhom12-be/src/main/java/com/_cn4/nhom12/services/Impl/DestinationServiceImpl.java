package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.DTO.request.DestinationRequest;
import com._cn4.nhom12.entity.Destination;
import com._cn4.nhom12.entity.TourType;
import com._cn4.nhom12.repository.DestinationRepo;
import com._cn4.nhom12.repository.TourTypeRepo;
import com._cn4.nhom12.services.DestinationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DestinationServiceImpl implements DestinationService {

    @Autowired
    DestinationRepo destinationRepo;
    @Autowired
    TourTypeRepo tourTypeRepo;


    public Destination saveDestination(Destination destination) {
        return destinationRepo.save(destination);
    }

    @Override
    public List<Destination> getAll() {
        return destinationRepo.findAll();
    }

    @Override
    public List<Destination> search(String destinationName, String cityName, String countryName, String continentName) {
        return destinationRepo.search(destinationName, cityName, countryName, continentName);
    }

    @Override
    public ResponseEntity<Destination> getById(String id) {
        Optional<Destination> itemExist = destinationRepo.findById(id);
        Destination entity = itemExist.get();
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Destination> create(DestinationRequest request) {
        Destination entity = new Destination();
        this.setValueDtos(request, entity);
        return new ResponseEntity<>(this.saveDestination(entity), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Destination> update(DestinationRequest request, String id) {
        Optional<Destination> itemExist = destinationRepo.findById(id);
        if (itemExist.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Destination entity = itemExist.get();
        this.setValueDtos(request, entity);
        return new ResponseEntity<>(this.saveDestination(entity), HttpStatus.OK);
    }

    private void setValueDtos(DestinationRequest request, Destination entity) {
        entity.setName(request.getName());
        entity.setContinent(request.getContinent());
        entity.setCountry(request.getCountry());
        entity.setCity(request.getCity());
        entity.setLocation(request.getLocation());
        entity.setRating(request.getRating());
        entity.setContactInfo(request.getContactInfo());
        entity.setEntryFee(request.getEntryFee());
        entity.setOpeningHours(request.getOpeningHours());
        entity.setDescription(request.getDescription());
        entity.setImage(request.getImage());

        if (!CollectionUtils.isEmpty(request.getTourTypes())) {
            Set<TourType> tourTypeSet = new HashSet<>();

            for (TourType tourType : request.getTourTypes()) {
                Optional<TourType> existingTourType = tourTypeRepo.findById(tourType.getId());

                if (existingTourType.isPresent()) {
                    tourTypeSet.add(existingTourType.get());
                } else {
                    tourTypeSet.add(tourType);
                }
            }

            entity.setTourTypes(tourTypeSet);
        } else {
            entity.setTourTypes(null);
        }
    }
//    private void handleTourTypesDtos(DestinationRequest request) {
//        Set<TourType> tourTypeSet = new HashSet<>();
//
//        for (TourType tourType : request.getTourTypes()) {
//            Optional<TourType> existingTourType = tourTypeRepo.findById(tourType.getId());
//            existingTourType.ifPresent(tourTypeSet::add);
//        }
//
//        request.setTourTypes(tourTypeSet);
//    }


    @Override
    public ResponseEntity<String> delete(String id) {
        destinationRepo.deleteById(id);
        return new ResponseEntity<>("Delete succeed", HttpStatus.OK);
    }
}
