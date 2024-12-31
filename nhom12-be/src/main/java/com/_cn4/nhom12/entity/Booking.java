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

    @Column(name = "placeId")
    private String placeId;

    @Column(name = "placeName")
    private String placeName;

    @Column(name = "startDate")
    private LocalDate startDate;

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
    private Account buyer;

    @Column(name = "statusRoom")
    private String statusRoom;

    @Column(name = "statusOrder")
    private String statusOrder;

    @Column(name = "purchaseDate")
    LocalDate purchaseDate;
}
