package com._cn4.nhom12.controller;

import com._cn4.nhom12.entity.TourType;
import com._cn4.nhom12.enums.Constant;
import com._cn4.nhom12.services.TourTypeService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/tourtypes")
class TourTypeController {
    @Autowired
    private TourTypeService tourTypeService;

    public TourTypeController(TourTypeService tourTypeService) {
        this.tourTypeService = tourTypeService;
    }

    @GetMapping("/search")
    ResponseEntity<List<TourType>> searchTourTypes(@RequestParam String name) {
        List<TourType> result = tourTypeService.searchTourTypes(name);
        return  ResponseEntity.ok(result);
    }
    @GetMapping
    @Secured({Constant.ROLE_SUPER_ADMIN})
    List<TourType> getAll() {
        return tourTypeService.getAllTourTypes();
    }

    @PostMapping
    @Secured({Constant.ROLE_SUPER_ADMIN})
    TourType create(@RequestBody TourType request) {
        return tourTypeService.createTourType(request);
    }

    @PutMapping("/{id}")
    @Secured({Constant.ROLE_SUPER_ADMIN})
    TourType update(@PathVariable String id, @RequestBody TourType request) {
        return tourTypeService.updateTourType(id, request);
    }

    @DeleteMapping("/{id}")
    @Secured({Constant.ROLE_SUPER_ADMIN})
    ResponseEntity<String> deleteById(@PathVariable String id) {
        return tourTypeService.deleteTourType(id);
    }

    @GetMapping("/{id}")
    @Secured({Constant.ROLE_SUPER_ADMIN})
    TourType getById(@PathVariable String id) {
        return tourTypeService.getTourTypeById(id);
    }

}
