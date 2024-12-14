package com._cn4.nhom12.controller;

import com._cn4.nhom12.DTO.ApiResponse;
import com._cn4.nhom12.DTO.PaymentDTO;
import com._cn4.nhom12.services.Impl.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${spring.application.api-prefix}/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    @GetMapping("/vn-pay")
    public ApiResponse<PaymentDTO.VNPayResponse> pay(HttpServletRequest request) {
        ApiResponse response = new ApiResponse<>();
        response.setData(paymentService.createVnPayPayment(request));
        response.setMessage("Success");
        return new ApiResponse<>(response);
    }
    @GetMapping("/vn-pay-callback")
    public ApiResponse<PaymentDTO.VNPayResponse> payCallbackHandler(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");

        ApiResponse response = new ApiResponse<>();
        if (status.equals("00")) {
            response.setMessage("Success");
            response.setData(new PaymentDTO.VNPayResponse("00", "Success", ""));
            return new ApiResponse<>(response);
        } else {
            response.setMessage("Failed");
            response.setData(new PaymentDTO.VNPayResponse(status, "Failed", ""));
            return new ApiResponse<>(response);
        }
    }
}
