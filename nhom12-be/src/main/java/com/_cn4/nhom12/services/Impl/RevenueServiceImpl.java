package com._cn4.nhom12.services.Impl;

import com._cn4.nhom12.repository.AccountRepo;
import com._cn4.nhom12.repository.BookingRepo;
import com._cn4.nhom12.services.RevenueService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.Month;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RevenueServiceImpl implements RevenueService {
    @Autowired
    private BookingRepo bookingRepository;

    @Autowired
    private AccountRepo accountRepo;

    @Override
    public Map<String, Double> getRevenueStats(String ownerId, String placeId) {
        Double dailyRevenue;
        Double monthlyRevenue;
        Double yearlyRevenue;

        if (ownerId == null) {
            // No ownerId provided: Calculate revenue for all places
            dailyRevenue = bookingRepository.findDailyRevenue();
            monthlyRevenue = bookingRepository.findMonthlyRevenue();
            yearlyRevenue = bookingRepository.findYearlyRevenue();
        } else if (placeId != null) {
            // Both ownerId and placeId provided
            dailyRevenue = bookingRepository.findDailyRevenueByPlaceIdAndOwnerId(ownerId, placeId);
            monthlyRevenue = bookingRepository.findMonthlyRevenueByPlaceIdAndOwnerId(ownerId, placeId);
            yearlyRevenue = bookingRepository.findYearlyRevenueByPlaceIdAndOwnerId(ownerId, placeId);
        } else {
            // Only ownerId provided
            dailyRevenue = bookingRepository.findDailyRevenueByOwnerId(ownerId);
            monthlyRevenue = bookingRepository.findMonthlyRevenueByOwnerId(ownerId);
            yearlyRevenue = bookingRepository.findYearlyRevenueByOwnerId(ownerId);
        }

        Map<String, Double> revenueStats = new HashMap<>();
        revenueStats.put("dailyRevenue", dailyRevenue != null ? dailyRevenue : 0.0);
        revenueStats.put("monthlyRevenue", monthlyRevenue != null ? monthlyRevenue : 0.0);
        revenueStats.put("yearlyRevenue", yearlyRevenue != null ? yearlyRevenue : 0.0);

        return revenueStats;
    }

    public Map<String, Long> getNewCustomersStats() {
        Long todayCount = accountRepo.countNewCustomersToday();

        Map<String, Long> stats = new HashMap<>();
        stats.put("today", todayCount);
        return stats;
    }

    public Map<String, Object> getMonthlyStatistics(String ownerId, int year) {
        // Lấy dữ liệu từ database
        List<Object[]> revenueData = bookingRepository.getMonthlyRevenue(ownerId, year);
        List<Object[]> registrationData = accountRepo.getMonthlyRegistrations(year);

        // Khởi tạo labels và datasets
        List<String> labels = new ArrayList<>();
        List<Double> revenueList = new ArrayList<>();
        List<Integer> registrationList = new ArrayList<>();

        // Map để dễ xử lý
        Map<Integer, Double> revenueMap = revenueData.stream()
                .collect(Collectors.toMap(row -> (Integer) row[0], row -> (Double) row[1]));
        Map<Integer, Integer> registrationMap = registrationData.stream()
                .collect(Collectors.toMap(row -> (Integer) row[0], row -> ((Number) row[1]).intValue()));

        // Duyệt qua các tháng trong năm
        for (int month = 1; month <= 12; month++) {
            labels.add(Month.of(month).name().substring(0, 3)); // "Jan", "Feb", ...
            revenueList.add(revenueMap.getOrDefault(month, 0.0));
            registrationList.add(registrationMap.getOrDefault(month, 0));
        }

        // Tạo datasets
        List<Map<String, Object>> datasets = new ArrayList<>();
        datasets.add(Map.of(
                "label", "Doanh thu theo tháng",
                "color", "info",
                "data", revenueList
        ));
        datasets.add(Map.of(
                "label", "Số người đăng ký theo tháng",
                "color", "dark",
                "data", registrationList
        ));

        // Kết quả trả về
        return Map.of(
                "labels", labels,
                "datasets", datasets
        );
    }
}
