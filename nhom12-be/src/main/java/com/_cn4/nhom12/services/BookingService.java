package com._cn4.nhom12.services;

import com._cn4.nhom12.entity.Booking;

import java.util.List;

public interface BookingService {
    List<Booking> getAllBookings();
    Booking getBookingById(String id);
    Booking createBooking(Booking booking, String placeId);
    Booking updateBooking(String id, Booking updatedBooking);
    void deleteBooking(String id);
}
