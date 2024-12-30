package com._cn4.nhom12.DTO.response;

import com._cn4.nhom12.entity.Booking;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingWithRatingDTO {
    Booking booking;
    boolean hasRated;

}
