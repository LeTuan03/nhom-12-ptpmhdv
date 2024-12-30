package com._cn4.nhom12.repository;

import com._cn4.nhom12.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepo extends JpaRepository<Rating, String> {
    boolean existsByPlaceIdAndBuyerId(String placeId, String buyerId);

    // Tìm tất cả các đánh giá của một Place
    List<Rating> findByPlaceId(String placeId);
}
