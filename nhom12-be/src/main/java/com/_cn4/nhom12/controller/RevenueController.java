package com._cn4.nhom12.controller;

import com._cn4.nhom12.enums.Constant;
import com._cn4.nhom12.services.RevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/stats")
public class RevenueController {
    @Autowired
    private RevenueService revenueService;

    @GetMapping("/revenue")
//    @Secured({Constant.ROLE_SUPER_ADMIN, Constant.ROLE_ADMIN})
    public ResponseEntity<Map<String, Double>> getRevenueStats(
            @RequestParam(required = false) String ownerId,
            @RequestParam(required = false) String placeId) {

        Map<String, Double> revenueStats = revenueService.getRevenueStats(ownerId, placeId);
        return ResponseEntity.ok(revenueStats);
    }

    @GetMapping("/new-customers")
//    @Secured({Constant.ROLE_SUPER_ADMIN, Constant.ROLE_ADMIN})
    public ResponseEntity<Map<String, Long>> getNewCustomersStats() {
        Map<String, Long> revenueStats = revenueService.getNewCustomersStats();
        return ResponseEntity.ok(revenueStats);
    }

    @GetMapping("/monthly")
//    @Secured({Constant.ROLE_SUPER_ADMIN, Constant.ROLE_ADMIN})
    public ResponseEntity<Map<String, Object>> getMonthlyStatistics(
            @RequestParam(value = "year", defaultValue = "2024") int year,
            @RequestParam(value = "ownerId", required = false) String ownerId) {
        Map<String, Object> statistics = revenueService.getMonthlyStatistics(ownerId, year);
        return ResponseEntity.ok(statistics);
    }
}
