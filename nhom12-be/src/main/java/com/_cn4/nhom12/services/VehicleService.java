package com._cn4.nhom12.services;

import com._cn4.nhom12.entity.Vehicle;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface VehicleService {

    List<Vehicle> getAllVehicle();

    ResponseEntity<Vehicle> createVehicle(Vehicle request);
    ResponseEntity<Vehicle> getVehicle(String id);

    ResponseEntity<Vehicle> updateVehicle(Vehicle request);
    ResponseEntity<String> deleteVehicle(String id);

}
