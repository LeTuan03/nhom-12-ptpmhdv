package com._cn4.nhom12.controller;

import com._cn4.nhom12.entity.Continents;
import com._cn4.nhom12.enums.Constant;
import com._cn4.nhom12.services.ContinentsService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @Secured({Constant.ROLE_SUPER_ADMIN})
    ResponseEntity<Continents> create(@RequestBody @Valid Continents request) {
        return continentsService.createContinents(request);
    }

    @PutMapping
    @Secured({Constant.ROLE_SUPER_ADMIN})
    ResponseEntity<Continents> update(@RequestBody @Valid Continents request) {
        return continentsService.updateContinents(request);
    }

    @DeleteMapping("/{id}")
    @Secured({Constant.ROLE_SUPER_ADMIN})
    ResponseEntity<String> deleteById(@PathVariable String id) {
        return continentsService.deleteContinents(id);
    }

    @GetMapping("/{id}")
    ResponseEntity<Continents> getById(@PathVariable String id) {
        return continentsService.getContinents(id);
    }

}
