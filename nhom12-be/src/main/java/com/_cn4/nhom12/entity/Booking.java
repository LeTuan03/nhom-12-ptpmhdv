package com._cn4.nhom12.entity;



import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private String id;

    @NotBlank(message = "Tên không được để trống")
    @Column(name = "customerName")
    private String customerName;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @NotNull(message = "Địa điểm không được để trống")
    @Column(name = "placeId")
    private String placeId;

    @Column(name = "placeName")
    private String placeName;

    @Column(name = "startDate")
    private LocalDate startDate;

    @NotNull(message = "Số người không được để trống")
    @Column(name = "numberOfPeople")
    private int numberOfPeople;

    @Column(name = "totalPrice")
    private double totalPrice;

    @Column(name = "isRated")
    private Boolean isRated;

    @Column(name = "specialRequests", columnDefinition = "TEXT")
    private String specialRequests;

    @ManyToOne
    @JoinColumn(name = "buyerId")
    @NotNull(message = "Người mua không được để trống")
    private Account buyer;

    @Column(name = "statusRoom")
    private String statusRoom;

    @Column(name = "statusOrder")
    private String statusOrder;

    @Column(name = "purchaseDate")
    LocalDate purchaseDate;
}
