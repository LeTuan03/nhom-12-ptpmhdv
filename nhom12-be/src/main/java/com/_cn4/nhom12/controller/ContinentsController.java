package com._cn4.nhom12.controller;

import com._cn4.nhom12.entity.Continents;
import com._cn4.nhom12.services.ContinentsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/continents")
public class ContinentsController {
    @Autowired
    ContinentsService continentsService;

    @GetMapping("/search")
    ResponseEntity<List<Continents>> searchContinents(@RequestParam String name) {
        List<Continents> result = continentsService.searchContinents(name);
        return ResponseEntity.ok(result);
    }
    @GetMapping
    List<Continents> getAll() {
        return continentsService.getAllContinents();
    }

    @PostMapping
    ResponseEntity<Continents> create(@RequestBody Continents request) {
        return continentsService.createContinents(request);
    }

    @PutMapping
    ResponseEntity<Continents> update(@RequestBody Continents request) {
        return continentsService.updateContinents(request);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteById(@PathVariable String id) {
        return continentsService.deleteContinents(id);
    }

    @GetMapping("/{id}")
    ResponseEntity<Continents> getById(@PathVariable String id) {
        return continentsService.getContinents(id);
    }

}
