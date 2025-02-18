package com._cn4.nhom12.services;

import com._cn4.nhom12.DTO.request.RatingRequest;
import com._cn4.nhom12.entity.Destination;
import com._cn4.nhom12.entity.Rating;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RatingService {
//    public boolean hasRated(String placeId, String buyerId);
    Rating createRating(RatingRequest request);
    public List<Rating> getRatingsByPlaceId(String placeId);
    List<Rating> getAllRating();
    Rating getById(String id);
}