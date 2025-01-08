package com._cn4.nhom12.DTO.request;

import com._cn4.nhom12.entity.City;
import com._cn4.nhom12.entity.Continents;
import com._cn4.nhom12.entity.Country;
import com._cn4.nhom12.entity.TourType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DestinationRequest {
    @NotBlank(message = "Tên không được để trống")
    @Size(min = 5, message = "Tên không được ít hơn 5 ký tự")
    String name;
    @NotBlank(message = "Miêu tả không được để trống")
    String description;
    String location;
    String rating;
    String entryFee;
    String openingHours;
    String contactInfo;
    @NotBlank(message = "Ảnh bìa không được để trống")
    String image;
    Continents continent;
    Country country;
    City city;
    Set<TourType> tourTypes;
}
