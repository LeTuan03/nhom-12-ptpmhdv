package com._cn4.nhom12.entity;



import jakarta.persistence.*;
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

    @Column(name = "customerName")
    private String customerName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    private String placeId;

    @Column(name = "startDate")
    private LocalDate startDate;

    @Column(name = "numberOfPeople")
    private int numberOfPeople;

    @Column(name = "totalPrice")
    private double totalPrice;

    @Column(name = "specialRequests")
    private String specialRequests;
}
