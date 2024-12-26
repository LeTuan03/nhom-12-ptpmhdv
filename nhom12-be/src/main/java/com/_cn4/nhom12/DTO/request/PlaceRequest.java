package com._cn4.nhom12.DTO.request;

import com._cn4.nhom12.entity.Booking;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PlaceRequest {
    private String id;
    private String name;
    private double pricePerPerson;
    private List<Booking> bookings;
    private String ownerId;
    private String destinationId;
    private String destinationName;
    private String imageUrl;
}
