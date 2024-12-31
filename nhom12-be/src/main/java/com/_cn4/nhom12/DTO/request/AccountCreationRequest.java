package com._cn4.nhom12.DTO.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;


@Getter
public class AccountCreationRequest {
    private String name;
    @NotBlank(message = "Mật khẩu không được để trống")
    @Size(min = 5, message = "Mật khẩu không được ít hơn 5 ký tự")
    private String password;
    private String phone;
    @NotBlank(message = "Tên không được để trống")
    @Size(min = 5, message = "Tên không được ít hơn 5 ký tự")
    private String email;
    private String birthday;
    private String gender;
    private String avatar;

    @NotBlank(message = "Tên đăng nhập không được để trống")
    @Size(min = 5, message = "Tên đăng nhập không được ít hơn 5 ký tự")
    private String username;
    @NotNull(message = "Không được để trống")
    private String role;
}
