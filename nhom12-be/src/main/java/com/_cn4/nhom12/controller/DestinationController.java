package com._cn4.nhom12.controller;

import com._cn4.nhom12.DTO.request.DestinationRequest;
import com._cn4.nhom12.entity.Destination;
import com._cn4.nhom12.services.DestinationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/destination")
public class DestinationController {

    DestinationService destinationService;

    @GetMapping
    public List<Destination> getAll() {
        return destinationService.getAll();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Destination>> search(
            @RequestParam(required = false) String destinationName,
            @RequestParam(required = false) String cityName,
            @RequestParam(required = false) String countryName,
            @RequestParam(required = false) String continentName) {
        List<Destination> results = destinationService.search(destinationName, cityName, countryName, continentName);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Destination> getById(@PathVariable String id) {
        return destinationService.getById(id);
    }

    @PostMapping
    public ResponseEntity<Destination> create(@RequestBody DestinationRequest request) {
        return destinationService.create(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Destination> update(@PathVariable String id, @RequestBody DestinationRequest request) {
        return destinationService.update(request, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        return destinationService.delete(id);
    }
}
