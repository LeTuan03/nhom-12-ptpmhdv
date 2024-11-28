package com._cn4.nhom12.DTO;

import com._cn4.nhom12.enums.CodeEnum;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    int code = 200;
    String message = CodeEnum.RESPONSE_OK.getMessage();
    T data;

    public ApiResponse(ApiResponse response) {
        this.code = response.getCode();
        this.message = response.getMessage();
        this.data = (T) response.getData();
    }



    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
