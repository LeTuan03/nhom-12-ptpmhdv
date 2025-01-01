package com._cn4.nhom12.DTO.request;

import com._cn4.nhom12.entity.City;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BookingStatusRequest {
    @NotBlank(message = "Không được để trống")
    private String bookingId;
    @NotBlank(message = "Không được để trống")
    private String statusOrder;
}
