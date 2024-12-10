package com._cn4.nhom12.repository;


import com._cn4.nhom12.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepo extends JpaRepository<Booking, String> {
}
