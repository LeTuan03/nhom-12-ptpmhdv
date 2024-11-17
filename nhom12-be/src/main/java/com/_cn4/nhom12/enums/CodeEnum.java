package com._cn4.nhom12.enums;

public enum CodeEnum {
    RESPONSE_OK(200, "Thành công"),
    ;

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    private int code;

    private String message;


    CodeEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }

}
