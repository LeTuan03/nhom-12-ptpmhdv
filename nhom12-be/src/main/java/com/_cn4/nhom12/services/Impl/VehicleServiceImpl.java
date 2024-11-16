package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.entity.Vehicle;
import com._cn4.nhom12.repository.VehicleRepo;
import com._cn4.nhom12.services.VehicleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VehicleServiceImpl implements VehicleService {

    private VehicleRepo vehicleRepo;

    private void setValueDtos(Vehicle entity, Vehicle request) {
        if (!Objects.isNull(request.getId())) {

            entity.setId(request.getId());
        }
        entity.setName(request.getName());
        entity.setManufacture(request.getManufacture());
        entity.setLicensePlate(request.getLicensePlate());
    }

    @Override
    public List<Vehicle> getAllVehicle() {
        return vehicleRepo.findAll();
    }


    @Override
    public ResponseEntity<Vehicle> createVehicle(Vehicle request) {
        Vehicle entity = new Vehicle();

        this.setValueDtos(entity, request);

        vehicleRepo.save(entity);
        return new ResponseEntity<>(vehicleRepo.save(entity), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Vehicle> getVehicle(String id) {

        Optional<Vehicle> itemExist = vehicleRepo.findById(id);
        Vehicle entity = itemExist.get();

        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Vehicle> updateVehicle(Vehicle request) {
        Optional<Vehicle> itemExist = vehicleRepo.findById(request.getId());
        Vehicle entity = itemExist.get();
        this.setValueDtos(entity, request);
        vehicleRepo.save(entity);
        return new ResponseEntity<>(vehicleRepo.save(entity), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteVehicle(String id) {
        vehicleRepo.deleteById(id);
        return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
    }
}
