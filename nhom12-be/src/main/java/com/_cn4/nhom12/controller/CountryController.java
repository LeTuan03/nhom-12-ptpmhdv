package com._cn4.nhom12.controller;

import com._cn4.nhom12.DTO.request.CountryRequest;
import com._cn4.nhom12.entity.Country;
import com._cn4.nhom12.enums.Constant;
import com._cn4.nhom12.services.CountryService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/countries")
public class CountryController {
    @Autowired
    private CountryService countryService;

    @GetMapping
    public ResponseEntity<List<Country>> getAllCountries() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }
    @GetMapping("/search")
    ResponseEntity<List<Country>> searchContinents(@RequestParam(value = "name", required = false) String name) {
        List<Country> result = countryService.searchByName(name);
        return ResponseEntity.ok(result);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Country> getCountryById(@PathVariable String id) {
        return ResponseEntity.ok(countryService.getCountryById(id));
    }

    @PostMapping("/with-cities")
    @Secured({Constant.ROLE_SUPER_ADMIN})
    public ResponseEntity<Country> createCountryWithCities(@RequestBody @Valid CountryRequest country) {
        return ResponseEntity.ok(countryService.createCountryWithCities(country));
    }

    @PutMapping("/{id}/with-cities")
    @Secured({Constant.ROLE_SUPER_ADMIN})
    public ResponseEntity<Country> updateCountryWithCities(@PathVariable String id, @RequestBody @Valid CountryRequest request) {
        return ResponseEntity.ok(countryService.updateCountryWithCities(id, request));
    }

    @DeleteMapping("/{id}")
    @Secured({Constant.ROLE_SUPER_ADMIN})
    public ResponseEntity<Void> deleteCountry(@PathVariable String id) {
        countryService.deleteCountry(id);
        return ResponseEntity.noContent().build();
    }
}
