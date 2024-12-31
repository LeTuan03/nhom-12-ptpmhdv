package com._cn4.nhom12.DTO.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TourTypeRequest {
    String id;
    @NotNull(message = "Tên được để trống")
    String name;
}
