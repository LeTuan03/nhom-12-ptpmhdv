package com._cn4.nhom12.controller;

import com._cn4.nhom12.DTO.ApiResponse;
import com._cn4.nhom12.DTO.PaymentDTO;
import com._cn4.nhom12.DTO.request.BookingStatusRequest;
import com._cn4.nhom12.enums.Constant;
import com._cn4.nhom12.services.BookingService;
import com._cn4.nhom12.services.Impl.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("${spring.application.api-prefix}/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final BookingService bookingService;

    @GetMapping("/vn-pay")
    @Secured({Constant.ROLE_SUPER_ADMIN, Constant.ROLE_ADMIN, Constant.ROLE_USER})
    public ApiResponse<PaymentDTO.VNPayResponse> pay(HttpServletRequest request) {
        ApiResponse response = new ApiResponse<>();
        response.setData(paymentService.createVnPayPayment(request));
        response.setMessage("Success");
        return new ApiResponse<>(response);
    }

//    @GetMapping("/vn-pay-callback")
//    public ApiResponse<PaymentDTO.VNPayResponse> payCallbackHandler(HttpServletRequest request) {
//        String status = request.getParameter("vnp_ResponseCode");
//        String orderInfo = request.getParameter("vnp_OrderInfo");
//
//
//        String orderId = orderInfo.substring("orderId=".length());
//        System.out.println("orderId:" + orderId);
//
//        ApiResponse response = new ApiResponse<>();
//        if (status.equals("00")) {
//            response.setMessage("Success");
//            response.setData(
//                    new PaymentDTO.VNPayResponse(
//                            "00", "Success", "orderId:" + orderId)
//            );
//            return new ApiResponse<>(response);
//        } else {
//            response.setMessage("Failed");
//            response.setData(new PaymentDTO.VNPayResponse(status, "Failed", ""));
//            return new ApiResponse<>(response);
//        }
//    }

    @GetMapping("/vn-pay-callback")
    public RedirectView payCallbackHandler(HttpServletRequest request) {
        // Lấy các tham số từ request
        String status = request.getParameter("vnp_ResponseCode");
        String orderInfo = request.getParameter("vnp_OrderInfo");

        // Khởi tạo URL redirect (sẽ redirect đến trang frontend)
        String redirectUrl = "http://localhost:3000/reservation"; // Địa chỉ trang frontend của bạn
        String orderId = "";

        try {
            // Kiểm tra và trích xuất orderId từ vnp_OrderInfo
            if (orderInfo != null) {
                // Xử lý nếu orderInfo bắt đầu với dấu '&'
                if (orderInfo.startsWith("&")) {
                    orderInfo = orderInfo.substring(1); // Loại bỏ dấu '&' ở đầu chuỗi
                }

                // Kiểm tra và trích xuất orderId từ orderInfo
                if (orderInfo.startsWith("orderId=")) {
                    orderId = orderInfo.substring("orderId=".length());
                    System.out.println("orderId: " + orderId);

                    BookingStatusRequest bookingStatusRequest = new BookingStatusRequest();
                    bookingStatusRequest.setBookingId(orderId);
                    bookingStatusRequest.setStatusOrder(Constant.BOOKING_WAIT);
                    // Cập nhật trạng thái booking
                    bookingService.updateStatusBooking(bookingStatusRequest);
                } else {
                    throw new IllegalArgumentException("Invalid orderInfo format: " + orderInfo);
                }
            } else {
                throw new IllegalArgumentException("orderInfo is null");
            }

            // Kiểm tra status để xác định giao dịch thành công hay thất bại
            if ("00".equals(status)) {
                // Giao dịch thành công
//                redirectUrl += "?orderId=" + orderId + "&status=success";
                redirectUrl = "http://localhost:3000/success";

            } else {
                // Giao dịch thất bại
//                redirectUrl += "?orderId=" + orderId + "&status=failed&message=Transaction failed with response code: " + status;
                redirectUrl = "http://localhost:3000/error-purchase";
            }
        } catch (Exception e) {
            // Xử lý lỗi trong quá trình callback
            System.err.println("Error during payment callback: " + e.getMessage());
//            redirectUrl += "?status=error&message=" + e.getMessage();
        }

        // Trả về RedirectView với URL đã được chuẩn bị
        return new RedirectView(redirectUrl);
    }

}
