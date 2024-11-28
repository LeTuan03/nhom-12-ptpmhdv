package com._cn4.nhom12.controller;

import com._cn4.nhom12.entity.Country;
import com._cn4.nhom12.services.CountryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
public class CountryController {
    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public ResponseEntity<List<Country>> getAllCountries() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Country> getCountryById(@PathVariable String id) {
        return ResponseEntity.ok(countryService.getCountryById(id));
    }

    @PostMapping("/with-cities")
    public ResponseEntity<Country> createCountryWithCities(@RequestBody Country country) {
        return ResponseEntity.ok(countryService.createCountryWithCities(country));
    }

    @PutMapping("/{id}/with-cities")
    public ResponseEntity<Country> updateCountryWithCities(@PathVariable String id, @RequestBody Country country) {
        return ResponseEntity.ok(countryService.updateCountryWithCities(id, country));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCountry(@PathVariable String id) {
        countryService.deleteCountry(id);
        return ResponseEntity.noContent().build();
    }
}
