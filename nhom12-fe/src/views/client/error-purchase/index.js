import React from "react";
import ClientLayout from "layouts/authentication/components/ClientLayout";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ErrorPurchase() {
  const navigate = useNavigate();

  // Xử lý khi nhấn nút quay lại trang chủ
  const handleBackToHome = () => {
    navigate("/"); // Quay lại trang chủ
  };

  return (
    <ClientLayout top={10}>
      <Box
        sx={{
          height: "65vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          padding: 4,
        }}
      >
        {/* Icon SVG với dấu X biểu thị thất bại */}
        <div className="image-error">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="28"
            width="28"
            className="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
        </div>

        {/* Tiêu đề thanh toán thất bại */}
        <Typography
          variant="h4"
          sx={{
            mt: 2,
            fontWeight: "bold",
          }}
        >
          Thanh Toán Thất Bại!
        </Typography>

        {/* Mô tả chi tiết lỗi */}
        <Typography
          variant="body1"
          sx={{
            mt: 1,
            fontSize: "1rem",
            maxWidth: "80vw",
            textAlign: "center",
          }}
        >
          Rất tiếc, thanh toán của bạn đã thất bại. Vui lòng kiểm tra lại thông
          tin hoặc thử lại sau. Nếu bạn gặp vấn đề, hãy liên hệ với chúng tôi để
          được hỗ trợ.
        </Typography>
        {/* Nút quay lại trang chủ */}
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item>
            <Button
              variant="contained"
              sx={{ borderRadius: "8px", width: "200px", padding: "10px 0" }}
              onClick={handleBackToHome}
            >
              <span style={{ color: "#fff" }}>Quay lại trang chủ</span>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ClientLayout>
  );
}

export default ErrorPurchase;
