package com._cn4.nhom12.services;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UploadService {
    ResponseEntity<Object> createImage(MultipartFile imageUrl) throws IOException;
}
