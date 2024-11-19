package com._cn4.nhom12.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@Entity
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    String id;
    @Column(name = "username")
    String username;
    @Column(name = "name")
    String name;
    @Column(name = "password")
    String password;
    @Column(name = "phone")
    String phone;
    @Column(name = "email")
    String email;
    @Column(name = "birthday")
    String birthday;
    @Column(name = "gender")
    String gender;
    @Column(name = "avatar")
    String avatar;
    @Column(name = "role")
    String role;
}
