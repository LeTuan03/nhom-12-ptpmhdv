package com._cn4.nhom12.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "country")
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    String id;

    @Column(name = "name", nullable = false, unique = true)
    String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "continentsId")
    String continentsId;

    @Column(name = "image")
    String image;

    @Column(name = "continentsName")
    String continentsName;

    @OneToMany(mappedBy = "countryId", cascade = CascadeType.ALL, orphanRemoval = true)
    List<City> cities;

}

