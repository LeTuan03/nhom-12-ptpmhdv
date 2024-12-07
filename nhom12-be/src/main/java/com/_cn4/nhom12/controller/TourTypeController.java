package com._cn4.nhom12.controller;

import com._cn4.nhom12.entity.TourType;
import com._cn4.nhom12.services.TourTypeService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/tourtypes")
class TourTypeController {
    private final TourTypeService tourTypeService;

    public TourTypeController(TourTypeService tourTypeService) {
        this.tourTypeService = tourTypeService;
    }

    @GetMapping
    List<TourType> getAll() {
        return tourTypeService.getAllTourTypes();
    }

    @PostMapping
    TourType create(@RequestBody TourType request) {
        return tourTypeService.createTourType(request);
    }

    @PutMapping("/{id}")
    TourType update(@PathVariable String id, @RequestBody TourType request) {
        return tourTypeService.updateTourType(id, request);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteById(@PathVariable String id) {
        return tourTypeService.deleteTourType(id);
    }

    @GetMapping("/{id}")
    TourType getById(@PathVariable String id) {
        return tourTypeService.getTourTypeById(id);
    }

}
