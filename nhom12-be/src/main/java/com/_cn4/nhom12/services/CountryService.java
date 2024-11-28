package com._cn4.nhom12.services;
import com._cn4.nhom12.entity.Country;
import com._cn4.nhom12.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {
    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public Country getCountryById(String id) {
        return countryRepository.findById(id).orElseThrow(() -> new RuntimeException("Country not found"));
    }

    public Country createCountryWithCities(Country country) {
        country.getCities().forEach(city -> city.setCountry(country));
        return countryRepository.save(country);
    }

    public Country updateCountryWithCities(String id, Country updatedCountry) {
        Country existingCountry = getCountryById(id);
        existingCountry.setName(updatedCountry.getName());
        existingCountry.getCities().clear();
        updatedCountry.getCities().forEach(city -> {
            city.setCountry(existingCountry);
            existingCountry.getCities().add(city);
        });
        return countryRepository.save(existingCountry);
    }

    public void deleteCountry(String id) {
        countryRepository.deleteById(id);
    }
}
