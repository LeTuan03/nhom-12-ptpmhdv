package com._cn4.nhom12.DTO.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountResponse {
    String name;
    String phone;
    String email;
    String birthday;
    String gender;
    String avatar;
    String username;
    String role;
}
