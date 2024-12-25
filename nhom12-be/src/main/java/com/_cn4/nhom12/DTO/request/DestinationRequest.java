package com._cn4.nhom12.DTO.request;

import com._cn4.nhom12.entity.City;
import com._cn4.nhom12.entity.Continents;
import com._cn4.nhom12.entity.Country;
import com._cn4.nhom12.entity.TourType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DestinationRequest {
    String name;
    String description;
    String location;
    String rating;
    String entryFee;
    String openingHours;
    String contactInfo;
    String image;
    Continents continent;
    Country country;
    City city;
    Set<TourType> tourTypes;
}
