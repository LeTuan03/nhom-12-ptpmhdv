package com._cn4.nhom12.controller;

import com._cn4.nhom12.DTO.request.RatingRequest;
import com._cn4.nhom12.entity.Rating;
import com._cn4.nhom12.services.RatingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rating")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    // API tạo đánh giá mới cho một place
    @PostMapping
    public ResponseEntity<Rating> createRating(@RequestBody @Valid RatingRequest request) {
        try {
            // Tạo đánh giá mới
            Rating rating = ratingService.createRating(request);
            return new ResponseEntity<>(rating, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            // Nếu người dùng đã đánh giá place này rồi
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<Rating>> getAllRating() {
        return ResponseEntity.ok(ratingService.getAllRating());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rating> getById(@PathVariable String id) {
        return ResponseEntity.ok(ratingService.getById(id));
    }
}
