package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.DTO.response.BookingWithRatingDTO;
import com._cn4.nhom12.entity.Booking;
import com._cn4.nhom12.entity.Place;
import com._cn4.nhom12.repository.BookingRepo;
import com._cn4.nhom12.repository.PlaceRepo;
import com._cn4.nhom12.services.BookingService;
import com._cn4.nhom12.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepo bookingRepository;

    @Autowired
    private PlaceRepo placeRepository;

    @Autowired
    private RatingService ratingService;

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(String id) {
        return bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found!"));
    }

    @Override
    public Booking createBooking(Booking booking, String placeId) {
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new RuntimeException("Place not found!"));
        booking.setPlaceId(place.getId());
        booking.setTotalPrice(place.getPricePerPerson() * booking.getNumberOfPeople());
        return bookingRepository.save(booking);
    }

    @Override
    public Booking updateBooking(String id, Booking updatedBooking) {
        Booking existingBooking = getBookingById(id);
        existingBooking.setCustomerName(updatedBooking.getCustomerName());
        existingBooking.setPhone(updatedBooking.getPhone());
        existingBooking.setEmail(updatedBooking.getEmail());
        existingBooking.setStartDate(updatedBooking.getStartDate());
        existingBooking.setNumberOfPeople(updatedBooking.getNumberOfPeople());
//        existingBooking.setTotalPrice(existingBooking.getPlace().getPricePerPerson() * updatedBooking.getNumberOfPeople());
        existingBooking.setSpecialRequests(updatedBooking.getSpecialRequests());
        return bookingRepository.save(existingBooking);
    }

    @Override
    public void deleteBooking(String id) {
        bookingRepository.deleteById(id);
    }


    // Lấy các booking của người dùng và kiểm tra xem đã đánh giá địa điểm chưa
    public List<BookingWithRatingDTO> getBookingsAndRatings(String buyerId) {
        // Lấy danh sách các booking của người dùng
        List<Booking> bookings = bookingRepository.findByBuyerId(buyerId);

        // Tạo danh sách DTO kết hợp giữa booking và thông tin đánh giá
        return bookings.stream().map(booking -> {
            // Kiểm tra xem người dùng đã đánh giá địa điểm chưa
            boolean hasRated = ratingService.hasRated(booking.getPlaceId(), buyerId);

            return new BookingWithRatingDTO(booking, hasRated);
        }).collect(Collectors.toList());
    }

}
