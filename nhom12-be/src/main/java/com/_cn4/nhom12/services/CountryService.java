package com._cn4.nhom12.services;

import com._cn4.nhom12.DTO.request.CountryRequest;
import com._cn4.nhom12.entity.Country;

import java.util.List;

public interface CountryService {

    List<Country> getAllCountries();

    Country createCountryWithCities(CountryRequest country);


    Country getCountryById(String id);

    void deleteCountry(String id);

    Country updateCountryWithCities(String id, CountryRequest updatedCountry);
    List<Country> searchByName(String name);
}
