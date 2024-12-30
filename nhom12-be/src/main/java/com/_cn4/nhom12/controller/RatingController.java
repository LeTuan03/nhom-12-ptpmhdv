package com._cn4.nhom12.controller;

import com._cn4.nhom12.entity.Rating;
import com._cn4.nhom12.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rating")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    // API tạo đánh giá mới cho một place
    @PostMapping
    public ResponseEntity<Rating> createRating(@RequestParam String buyerId,
                                               @RequestParam String placeId,
                                               @RequestParam String title,
                                               @RequestParam String rate,
                                               @RequestParam String description) {
        try {
            // Tạo đánh giá mới
            Rating rating = ratingService.createRating(buyerId, placeId, title, rate, description);
            return new ResponseEntity<>(rating, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Nếu người dùng đã đánh giá place này rồi
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
