package com._cn4.nhom12.repository;

import com._cn4.nhom12.entity.Account;
import com._cn4.nhom12.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccountRepo extends JpaRepository<Account, String> {
    Optional<Account> findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByRole(String role);

    @Query("SELECT COUNT(a) FROM Account a WHERE a.createdDate = CURRENT_DATE")
    Long countNewCustomersToday();

    @Query("SELECT MONTH(a.createdDate) AS month, COUNT(a.id) AS totalRegistrations " +
            "FROM Account a " +
            "WHERE YEAR(a.createdDate) = :year " +
            "GROUP BY MONTH(a.createdDate) " +
            "ORDER BY MONTH(a.createdDate)")
    List<Object[]> getMonthlyRegistrations(@Param("year") int year);

    @Query("SELECT p FROM Account p WHERE " +
            "(:username IS NULL OR LOWER(p.username) LIKE LOWER(CONCAT('%', :username, '%'))) ")
    List<Account> searchByUsername(@Param("username") String username);
}
