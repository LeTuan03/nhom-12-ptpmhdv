package com._cn4.nhom12.controller;

import com._cn4.nhom12.DTO.request.PlaceRequest;
import com._cn4.nhom12.entity.Place;
import com._cn4.nhom12.services.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    // Lấy tất cả các Place
    @GetMapping
    public ResponseEntity<List<Place>> getAllPlaces() {
        return ResponseEntity.ok(placeService.getAllPlaces());
    }

    // Lấy Place theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Place> getPlaceById(@PathVariable String id) {
        return ResponseEntity.ok(placeService.getPlaceById(id));
    }

    // Tạo Place mới, có thể liên kết với một Destination
    @PostMapping
    public ResponseEntity<Place> createPlace(@RequestBody PlaceRequest place) {
        return ResponseEntity.ok(placeService.createPlace(place));
    }

    // Cập nhật Place theo ID
    @PutMapping("/{id}")
    public ResponseEntity<Place> updatePlace(@PathVariable String id, @RequestBody PlaceRequest place) {
        return ResponseEntity.ok(placeService.updatePlace(id, place));
    }

    // Xóa Place theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlace(@PathVariable String id) {
        placeService.deletePlace(id);
        return ResponseEntity.noContent().build();
    }

    // Lấy danh sách Place theo Destination ID
    @GetMapping("/destination/{destinationId}")
    public ResponseEntity<List<Place>> getPlacesByDestination(@PathVariable String destinationId) {
        List<Place> places = placeService.getPlacesByDestination(destinationId);
        return ResponseEntity.ok(places);
    }
}
