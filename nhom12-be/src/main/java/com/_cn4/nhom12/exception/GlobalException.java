package com._cn4.nhom12.exception;

import com._cn4.nhom12.DTO.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalException {
    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<ApiResponse> handleExceptionGlobal(RuntimeException exception) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(ErrorCode.SERVER_ERROR.getCode());
        apiResponse.setMessage(exception.getMessage());
        System.out.println(exception.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse> handleException(Exception exception) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(ErrorCode.SERVER_ERROR.getCode());
        apiResponse.setMessage(exception.getMessage());
        System.out.println(exception.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handleExceptionMethodArgumentNotValid(MethodArgumentNotValidException exception) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(ErrorCode.SERVER_ERROR.getCode());
        apiResponse.setMessage(exception.getFieldError().getDefaultMessage());
        System.out.println(exception.getFieldError().getDefaultMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handleAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }
}
