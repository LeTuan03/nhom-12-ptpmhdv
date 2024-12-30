package com._cn4.nhom12.DTO.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;


@Getter
public class AccountCreationRequest {
    @NotBlank(message = "Tên không được để trống")
    @Size(min = 5, message = "Tên không được ít hơn 5")
    private String name;
    private String password;
    private String phone;
    private String email;
    private String birthday;
    private String gender;
    private String avatar;

    @NotBlank(message = "Tên không được để trống")
    @NotEmpty(message = "Tên không được để trống")
    @Size(min = 5, message = "Tên không được ít hơn 5")
    private String username;
    private String role;
}
