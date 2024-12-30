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
@Table(name = "rating")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    String id;
    @Column(name = "title")
    String title;
    @Column(name = "rate")
    String rate;
    @Column(name = "description")
    private String description;
    @ManyToOne
    @JoinColumn(name = "buyerId")
    private Account buyer;
    @ManyToOne
    @JoinColumn(name = "placeId")
    private Place place;
}
