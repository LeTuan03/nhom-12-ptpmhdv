import React from "react";
import ClientLayout from "layouts/authentication/components/ClientLayout";
import { Box, Typography, Button, Grid } from "@mui/material";
// import { ReactComponent as SuccessIcon } from "./success-icon.svg"; // SVG thành công

import { useNavigate } from "react-router-dom";

function Success() {
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
        }}
      >
        <div className="image">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M20 7L9.00004 18L3.99994 13"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {" "}
            </g>
          </svg>
        </div>


        {/* Tiêu đề thanh toán thành công */}
        <Typography
          variant="h4"
          sx={{
            mt: 2,
            // color: "#fff",
            fontWeight: "bold",
          }}
        >
          Thanh Toán Thành Công!
        </Typography>

        {/* Mô tả chi tiết */}
        <Typography
          variant="body1"
          sx={{
            // color: "#fff",
            mt: 1,
            fontSize: "1rem",
            maxWidth: "80vw",
            textAlign: "center",
          }}
        >
          Cảm ơn bạn đã đặt chỗ thành công! Chúng tôi đã ghi nhận yêu cầu của
          bạn và sẽ chuẩn bị mọi thứ sẵn sàng.
        </Typography>

        {/* Nút quay lại trang chủ */}
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
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

export default Success;
