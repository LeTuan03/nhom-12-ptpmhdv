package com._cn4.nhom12.controller;


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

    @GetMapping("bookings/{id}")
    public ResponseEntity<List<Booking>> getBookingByBuyerId(@PathVariable String id) {
        return ResponseEntity.ok(bookingService.getBookingsByBuyerId(id));
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

    @PutMapping("/{id}")
    @Secured({Constant.ROLE_SUPER_ADMIN, Constant.ROLE_ADMIN, Constant.ROLE_USER})
    public ResponseEntity<Booking> updateBooking(@PathVariable String id, @RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.updateBooking(id, booking));
    }

    @DeleteMapping("/{id}")
    @Secured({Constant.ROLE_SUPER_ADMIN, Constant.ROLE_ADMIN})
    public ResponseEntity<Void> deleteBooking(@PathVariable String id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }

    // API lấy các booking của người dùng và kiểm tra đánh giá cho mỗi place
//    @GetMapping("/getByBuyerId/{buyerId}")
//    public ResponseEntity<List<BookingWithRatingDTO>> getBookingsAndRatings(@PathVariable String buyerId) {
//        // Lấy danh sách các booking của người dùng và kiểm tra đã đánh giá chưa
//        List<BookingWithRatingDTO> bookingsWithRatings = bookingService.getBookingsAndRatings(buyerId);
//        return ResponseEntity.ok(bookingsWithRatings);
//    }
}

