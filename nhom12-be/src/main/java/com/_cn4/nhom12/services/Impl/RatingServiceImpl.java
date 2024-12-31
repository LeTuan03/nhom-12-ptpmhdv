package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.DTO.request.RatingRequest;
import com._cn4.nhom12.entity.Account;
import com._cn4.nhom12.entity.Booking;
import com._cn4.nhom12.entity.Place;
import com._cn4.nhom12.entity.Rating;
import com._cn4.nhom12.repository.AccountRepo;
import com._cn4.nhom12.repository.BookingRepo;
import com._cn4.nhom12.repository.PlaceRepo;
import com._cn4.nhom12.repository.RatingRepo;
import com._cn4.nhom12.services.RatingService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RatingServiceImpl implements RatingService {

    @Autowired
    private RatingRepo ratingRepository;

    @Autowired
    private AccountRepo accountRepository;

    @Autowired
    private PlaceRepo placeRepository;

    @Autowired
    private BookingRepo bookingRepo;

//    // Kiểm tra xem người dùng đã đánh giá place chưa
//    public boolean hasRated(String placeId, String buyerId) {
//        return ratingRepository.existsByPlaceIdAndBuyerId(placeId, buyerId);
//    }

    // Tạo một đánh giá mới cho place
    @Transactional
    public Rating createRating(RatingRequest request) {

        // Tìm thông tin người mua và place
        Account buyer = accountRepository.findById(request.getBuyerId())
                .orElseThrow(() -> new RuntimeException("Buyer not found"));
        Place place = placeRepository.findById(request.getPlaceId())
                .orElseThrow(() -> new RuntimeException("Place not found"));
        Booking booking = bookingRepo.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Tạo đánh giá mới
        Rating rating = new Rating();
        rating.setTitle(request.getTitle());
        rating.setRate(request.getRate());
        rating.setDescription(request.getDescription());
        rating.setBuyer(buyer);
        rating.setPlace(place);
        rating.setImage(request.getImage());

        booking.setIsRated(true);
        bookingRepo.save(booking);
        return ratingRepository.save(rating);
    }

    // Lấy tất cả các đánh giá của một place
    public List<Rating> getRatingsByPlaceId(String placeId) {
        return ratingRepository.findByPlaceId(placeId);
    }

    @Override
    public List<Rating> getAllRating() {
        return ratingRepository.findAll();
    }
}
