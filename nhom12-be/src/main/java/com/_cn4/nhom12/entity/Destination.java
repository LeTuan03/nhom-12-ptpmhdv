package com._cn4.nhom12.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "destination")
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "location")
    private String location;

    @Column(name = "rating")
    private String rating;

    @Column(name = "entry_fee")
    private String entryFee;

    @Column(name = "opening_hours")
    private String openingHours;

    @Column(name = "contact_info")
    private String contactInfo;

    @ManyToOne
    @JoinColumn(name = "continentId")
    Continents continent;

    @ManyToOne
    @JoinColumn(name = "countryId")
    Country country;

    @ManyToOne
    @JoinColumn(name = "cityId")
    City city;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "destination_tourtype",
            joinColumns = @JoinColumn(name = "destinationId"),
            inverseJoinColumns = @JoinColumn(name = "tourtypeId")
    )
    Set<TourType> tourTypes;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "destinationId", cascade = CascadeType.ALL, orphanRemoval = true)
    Set<Place> places;
}
