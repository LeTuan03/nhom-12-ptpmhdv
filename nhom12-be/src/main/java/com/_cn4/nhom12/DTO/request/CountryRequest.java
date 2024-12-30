package com._cn4.nhom12.DTO.request;

import com._cn4.nhom12.entity.City;
import lombok.Getter;

import java.util.List;

@Getter
public class CountryRequest {
    private String name;
    private String description;
    private String image;
    private String continentsId;
    private String continentsName;
    private List<City> cities;
}
