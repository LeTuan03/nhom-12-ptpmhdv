package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.entity.Account;
import com._cn4.nhom12.entity.Place;
import com._cn4.nhom12.entity.Rating;
import com._cn4.nhom12.repository.AccountRepo;
import com._cn4.nhom12.repository.PlaceRepo;
import com._cn4.nhom12.repository.RatingRepo;
import com._cn4.nhom12.services.RatingService;
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

    // Kiểm tra xem người dùng đã đánh giá place chưa
    public boolean hasRated(String placeId, String buyerId) {
        return ratingRepository.existsByPlaceIdAndBuyerId(placeId, buyerId);
    }

    // Tạo một đánh giá mới cho place
    public Rating createRating(String buyerId, String placeId, String title, String rate, String description) {
        // Kiểm tra xem người dùng đã đánh giá chưa
        if (hasRated(placeId, buyerId)) {
            throw new IllegalArgumentException("You have already rated this place.");
        }

        // Tìm thông tin người mua và place
        Account buyer = accountRepository.findById(buyerId)
                .orElseThrow(() -> new IllegalArgumentException("Buyer not found"));
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new IllegalArgumentException("Place not found"));

        // Tạo đánh giá mới
        Rating rating = new Rating();
        rating.setTitle(title);
        rating.setRate(rate);
        rating.setDescription(description);
        rating.setBuyer(buyer);
        rating.setPlace(place);

        return ratingRepository.save(rating);
    }

    // Lấy tất cả các đánh giá của một place
    public List<Rating> getRatingsByPlaceId(String placeId) {
        return ratingRepository.findByPlaceId(placeId);
    }
}
