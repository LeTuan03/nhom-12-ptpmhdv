package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.services.UploadService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UploadServiceImpl implements UploadService {

    CloudinaryServiceImpl cloudinaryService;

    @Override
    public ResponseEntity<Object> createImage(MultipartFile imageUrl) throws IOException {

        if(imageUrl != null) {
            return new ResponseEntity<>(cloudinaryService.uploadImage(imageUrl), HttpStatus.OK);
        }
        return new ResponseEntity<>("Server error", HttpStatus.BAD_REQUEST);
    }
}
