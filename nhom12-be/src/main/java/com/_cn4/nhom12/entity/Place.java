package com._cn4.nhom12.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Table(name = "places")
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column
    private String imageUrl;

    @Column(nullable = false)
    private double pricePerPerson;

    @Column(nullable = false)
    private int maxPerson;

    private String destinationId;

    private String destinationName;

    @OneToMany(mappedBy = "placeId", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Booking> bookings;

    @ManyToOne
    @JoinColumn(name = "ownerId")
    private Account owner;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}
