package com._cn4.nhom12.services;

import com._cn4.nhom12.DTO.ApiResponse;
import com._cn4.nhom12.DTO.request.AccountCreationRequest;
import com._cn4.nhom12.DTO.request.LoginRequest;
import com._cn4.nhom12.entity.Account;
import com._cn4.nhom12.entity.Rating;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RatingService {
    public boolean hasRated(String placeId, String buyerId);
    public Rating createRating(String buyerId, String placeId, String title, String rate, String description);
    public List<Rating> getRatingsByPlaceId(String placeId);
}