package com._cn4.nhom12.DTO.request;

import com._cn4.nhom12.entity.Booking;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PlaceRequest {
    private String id;
    @NotBlank(message = "Tên không được để trống")
    @Size(min = 5, message = "Tên không được ít hơn 5 ký tự")
    private String name;
    private double pricePerPerson;
    private List<Booking> bookings;
    @NotNull(message = "Chủ sở hữu không được để trống")
    private String ownerId;
    @NotNull(message = "Địa điểm không được để trống")
    private String destinationId;
    private String destinationName;
    private String imageUrl;
    private String description;
}
