package com._cn4.nhom12.exception;

public enum ErrorCode {
    SERVER_ERROR(500,"Lỗi hệ thống"),
    ;
    private int code;

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    private String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
