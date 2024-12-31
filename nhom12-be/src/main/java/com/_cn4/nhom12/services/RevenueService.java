package com._cn4.nhom12.services;

import java.util.Map;

public interface RevenueService {
    Map<String, Double> getRevenueStats(String ownerId, String placeId);
    Map<String, Long> getNewCustomersStats();
    Map<String, Object> getMonthlyStatistics(String ownerId, int year);
}
