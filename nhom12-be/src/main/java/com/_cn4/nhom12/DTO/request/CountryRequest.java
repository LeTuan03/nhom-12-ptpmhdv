package com._cn4.nhom12.DTO.request;

import com._cn4.nhom12.entity.City;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.util.List;

@Getter
public class CountryRequest {
    @NotBlank(message = "Tên không được để trống")
    @Size(min = 5, message = "Tên không được ít hơn 5 ký tự")
    private String name;
    private String description;
    private String image;
    private String continentsId;
    private String continentsName;
    private List<City> cities;
}
