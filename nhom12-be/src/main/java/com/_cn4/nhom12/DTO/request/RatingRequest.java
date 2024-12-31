package com._cn4.nhom12.DTO.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RatingRequest {
    @NotNull(message = "Không được để trống")
    String buyerId;
    @NotNull(message = "Không được để trống")
    String placeId;
    String title;
    @NotNull(message = "Không được để trống")
    float rate;
    String description;
    String image;
    String bookingId;
}
