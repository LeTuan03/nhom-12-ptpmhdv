package com._cn4.nhom12.DTO.request;

import lombok.Data;

@Data
public class AccountCreationRequest {
    private String name;
    private String password;
    private String phone;
    private String email;
    private String birthday;
    private String gender;
}
