package com._cn4.nhom12.DTO;

import com._cn4.nhom12.enums.CodeEnum;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
}
