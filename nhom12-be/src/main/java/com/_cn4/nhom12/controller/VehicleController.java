package com._cn4.nhom12.controller;

import com._cn4.nhom12.entity.Vehicle;
import com._cn4.nhom12.services.VehicleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/admin/vehicle")
public class VehicleController {
    VehicleService vehicleService;


    @GetMapping
    List<Vehicle> getAll() {
        return vehicleService.getAllVehicle();
    }

    @PostMapping
    ResponseEntity<Vehicle> create(@RequestBody Vehicle request) {
        return vehicleService.createVehicle(request);
    }

    @PutMapping
    ResponseEntity<Vehicle> update(@RequestBody Vehicle request) {
        return vehicleService.updateVehicle(request);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteById(@PathVariable String id) {
        return vehicleService.deleteVehicle(id);
    }

    @GetMapping("/{id}")
    ResponseEntity<Vehicle> getById(@PathVariable String id) {
        return vehicleService.getVehicle(id);
    }
}
