package com._cn4.nhom12.services;

import com._cn4.nhom12.DTO.request.BookingStatusRequest;
import com._cn4.nhom12.DTO.response.BookingWithRatingDTO;
import com._cn4.nhom12.entity.Booking;

import java.util.List;

public interface BookingService {
    List<Booking> getAllBookings();
    List<Booking> getBookingsByBuyerId(String buyerId);
    List<Booking> getBookingsByBuyerIdAndStatus(String buyerId);
    Booking getBookingById(String id);
    Booking updateStatusBooking(BookingStatusRequest request);
    Booking updateStatusRateBooking(String bookingId);
    Booking createBooking(Booking booking);
    Booking updateBooking(String id, Booking updatedBooking);
    void deleteBooking(String id);
//    List<BookingWithRatingDTO> getBookingsAndRatings(String buyerId);
}
