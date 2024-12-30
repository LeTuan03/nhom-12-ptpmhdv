package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.DTO.request.CountryRequest;
import com._cn4.nhom12.entity.City;
import com._cn4.nhom12.entity.Country;
import com._cn4.nhom12.repository.CityRepository;
import com._cn4.nhom12.repository.CountryRepository;
import com._cn4.nhom12.services.CountryService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CountryServiceImpl implements CountryService {

    @Autowired
    private CountryRepository countryRepository;
    @Autowired
    private CityRepository cityRepository;

    @Override
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    @Override
    public Country createCountryWithCities(CountryRequest request) {
        Country entity = new Country();
        entity.setName(request.getName());
        entity.setContinentsId(request.getContinentsId());
        entity.setContinentsName(request.getContinentsName());
        entity.setDescription(request.getDescription());
        entity.setImage(request.getImage());

        Country savedCountry = countryRepository.save(entity);

        List<City> cities = new ArrayList<>();
        for (City updatedCity : request.getCities()) {
            City newCity = new City();
            newCity.setName(updatedCity.getName());
            newCity.setCountryId(savedCountry.getId());
            cities.add(newCity);
        }

        List<City> savedCities = cityRepository.saveAll(cities);

        savedCountry.setCities(savedCities);

        return savedCountry;
    }


    @Override
    public Country getCountryById(String id) {
        return countryRepository.findById(id).orElseThrow(() -> new RuntimeException("Country not found"));
    }

    @Override
    public void deleteCountry(String id) {
        countryRepository.deleteById(id);
    }

    @Override
    public Country updateCountryWithCities(String id, CountryRequest request) {

        Optional<Country> optionalCountry = countryRepository.findById(id);
        if (optionalCountry.isEmpty()) {
            throw new EntityNotFoundException("Country with ID " + id + " not found");
        }
        Country existingCountry = optionalCountry.get();

        existingCountry.setName(request.getName());
        existingCountry.setContinentsId(request.getContinentsId());
        existingCountry.setContinentsName(request.getContinentsName());
        existingCountry.setDescription(request.getDescription());
        existingCountry.setImage(request.getImage());

        Country savedCountry = countryRepository.save(existingCountry);

        List<City> existingCities = new ArrayList<>(existingCountry.getCities());
        List<City> updatedCities = new ArrayList<>();

        for (City updatedCity : request.getCities()) {
            if (Objects.nonNull(updatedCity.getId())) {
                City existingCity = existingCities.stream()
                        .filter(city -> city.getId().equals(updatedCity.getId()))
                        .findFirst()
                        .orElse(null);

                if (existingCity != null) {
                    existingCity.setName(updatedCity.getName());
                    updatedCities.add(existingCity);
                }
            } else {
                City newCity = new City();
                newCity.setName(updatedCity.getName());
                newCity.setCountryId(savedCountry.getId());
                updatedCities.add(newCity);
            }
        }

        List<City> citiesToRemove = existingCities.stream()
                .filter(city -> updatedCities.stream().noneMatch(updatedCity ->
                        updatedCity.getId() != null && updatedCity.getId().equals(city.getId())))
                .toList();

        cityRepository.deleteAll(citiesToRemove);

        List<City> savedCities = cityRepository.saveAll(updatedCities);

        savedCountry.setCities(savedCities);

        return savedCountry;
    }

}
