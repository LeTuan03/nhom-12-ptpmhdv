package com._cn4.nhom12.repository;


import com._cn4.nhom12.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Booking, String> {
    List<Booking> findByBuyerId(String buyerId);

    List<Booking> findByBuyerIdAndStatusOrder(String buyerId, String orderStatus);
    List<Booking> findByBuyerIdAndStatusOrderIn(String buyerId, List<String> statusOrders);

    @Query("SELECT SUM(b.totalPrice) FROM Booking b WHERE b.purchaseDate = CURRENT_DATE AND b.statusOrder = 'Đã thanh toán'")
    Double findDailyRevenue();

    @Query("SELECT SUM(b.totalPrice) FROM Booking b WHERE MONTH(b.purchaseDate) = MONTH(CURRENT_DATE) AND YEAR(b.purchaseDate) = YEAR(CURRENT_DATE) AND b.statusOrder = 'Đã thanh toán'")
    Double findMonthlyRevenue();

    @Query("SELECT SUM(b.totalPrice) FROM Booking b WHERE YEAR(b.purchaseDate) = YEAR(CURRENT_DATE) AND b.statusOrder = 'Đã thanh toán'")
    Double findYearlyRevenue();

    @Query("SELECT SUM(b.totalPrice) FROM Booking b JOIN Place p ON b.placeId = p.id WHERE p.owner.id = :ownerId AND b.purchaseDate = CURRENT_DATE AND b.statusOrder = 'Đã thanh toán'")
    Double findDailyRevenueByOwnerId(@Param("ownerId") String ownerId);

    @Query("SELECT SUM(b.totalPrice) FROM Booking b JOIN Place p ON b.placeId = p.id WHERE p.owner.id = :ownerId AND MONTH(b.purchaseDate) = MONTH(CURRENT_DATE) AND YEAR(b.purchaseDate) = YEAR(CURRENT_DATE) AND b.statusOrder = 'Đã thanh toán'")
    Double findMonthlyRevenueByOwnerId(@Param("ownerId") String ownerId);

    @Query("SELECT SUM(b.totalPrice) FROM Booking b JOIN Place p ON b.placeId = p.id WHERE p.owner.id = :ownerId AND YEAR(b.purchaseDate) = YEAR(CURRENT_DATE) AND b.statusOrder = 'Đã thanh toán'")
    Double findYearlyRevenueByOwnerId(@Param("ownerId") String ownerId);

    @Query("SELECT SUM(b.totalPrice) FROM Booking b JOIN Place p ON b.placeId = p.id WHERE p.owner.id = :ownerId AND p.id = :placeId AND b.purchaseDate = CURRENT_DATE AND b.statusOrder = 'Đã thanh toán'")
    Double findDailyRevenueByPlaceIdAndOwnerId(@Param("ownerId") String ownerId, @Param("placeId") String placeId);

    @Query("SELECT SUM(b.totalPrice) FROM Booking b JOIN Place p ON b.placeId = p.id WHERE p.owner.id = :ownerId AND p.id = :placeId AND MONTH(b.purchaseDate) = MONTH(CURRENT_DATE) AND YEAR(b.purchaseDate) = YEAR(CURRENT_DATE) AND b.statusOrder = 'Đã thanh toán'")
    Double findMonthlyRevenueByPlaceIdAndOwnerId(@Param("ownerId") String ownerId, @Param("placeId") String placeId);

    @Query("SELECT SUM(b.totalPrice) FROM Booking b JOIN Place p ON b.placeId = p.id WHERE p.owner.id = :ownerId AND p.id = :placeId AND YEAR(b.purchaseDate) = YEAR(CURRENT_DATE) AND b.statusOrder = 'Đã thanh toán'")
    Double findYearlyRevenueByPlaceIdAndOwnerId(@Param("ownerId") String ownerId, @Param("placeId") String placeId);

    @Query("SELECT b.purchaseDate AS date, COUNT(DISTINCT b.buyer.id) AS customerCount, SUM(b.totalPrice) AS revenue " +
            "FROM Booking b " +
            "WHERE FUNCTION('YEAR', b.purchaseDate) = :year AND b.statusOrder = 'Đã thanh toán' " +
            "GROUP BY b.purchaseDate " +
            "ORDER BY b.purchaseDate")
    List<Object[]> getRevenueAndCustomerCountByDay(@Param("year") int year);

    @Query("SELECT MONTH(b.purchaseDate) AS month, SUM(b.totalPrice) AS totalRevenue " +
            "FROM Booking b " +
            "JOIN Place p ON b.placeId = p.id " +
            "WHERE (:ownerId IS NULL OR p.owner.id = :ownerId) " +
            "AND YEAR(b.purchaseDate) = :year " +
            "AND b.statusOrder = 'Đã thanh toán' " +
            "GROUP BY MONTH(b.purchaseDate) " +
            "ORDER BY MONTH(b.purchaseDate)")
    List<Object[]> getMonthlyRevenue(@Param("ownerId") String ownerId, @Param("year") int year);
}
