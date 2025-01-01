package com._cn4.nhom12.controller;


import com._cn4.nhom12.DTO.request.BookingStatusRequest;
import com._cn4.nhom12.DTO.response.BookingWithRatingDTO;
import com._cn4.nhom12.entity.Booking;
import com._cn4.nhom12.enums.Constant;
import com._cn4.nhom12.services.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable String id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

//    @GetMapping("bookings/{id}")
//    public ResponseEntity<List<Booking>> getBookingByBuyerId(@PathVariable String id) {
//        return ResponseEntity.ok(bookingService.getBookingsByBuyerId(id));
//    }

    @GetMapping("bookings/{id}")
    public ResponseEntity<List<Booking>> getBookingByBuyerId(@PathVariable String id) {
        return ResponseEntity.ok(bookingService.getBookingsByBuyerIdAndStatus(id));
    }

    @PostMapping
    @Secured({Constant.ROLE_SUPER_ADMIN, Constant.ROLE_ADMIN, Constant.ROLE_USER})
    public ResponseEntity<Booking> createBooking(@RequestBody @Valid Booking booking) {
        return ResponseEntity.ok(bookingService.createBooking(booking));
    }
    @PostMapping("/{id}")
    @Secured({Constant.ROLE_SUPER_ADMIN, Constant.ROLE_ADMIN, Constant.ROLE_USER})
    public ResponseEntity<Booking> updateStatusRateBooking(@PathVariable String bookingId) {
        return ResponseEntity.ok(bookingService.updateStatusRateBooking(bookingId));
    }

    @PostMapping("/update-status")
    @Secured({Constant.ROLE_SUPER_ADMIN, Constant.ROLE_ADMIN, Constant.ROLE_USER})
    public ResponseEntity<Booking> updateStatusRateBooking(@RequestBody @Valid BookingStatusRequest request) {
        return ResponseEntity.ok(bookingService.updateStatusBooking(request));
    }

    @PutMapping("/{id}")
    @Secured({Constant.ROLE_SUPER_ADMIN, Constant.ROLE_ADMIN, Constant.ROLE_USER})
    public ResponseEntity<Booking> updateBooking(@PathVariable String id, @RequestBody @Valid Booking booking) {
        return ResponseEntity.ok(bookingService.updateBooking(id, booking));
    }

    @DeleteMapping("/{id}")
    @Secured({Constant.ROLE_SUPER_ADMIN, Constant.ROLE_ADMIN})
    public ResponseEntity<Void> deleteBooking(@PathVariable String id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}

