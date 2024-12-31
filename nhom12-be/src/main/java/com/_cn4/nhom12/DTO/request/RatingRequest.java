package com._cn4.nhom12.DTO.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RatingRequest {
    String buyerId;
    String placeId;
    String title;
    float rate;
    String description;
    String image;
    String bookingId;
}
