import React from "react";
import ClientLayout from "layouts/authentication/components/ClientLayout";
import { Card, Grid, Typography, Box, Button, Divider, Avatar, Paper } from "@mui/material";

// Dữ liệu mẫu cho lịch sử đặt phòng
const reservationHistory = [
  {
    hotelName: "The Royal Bee Aparthotel",
    image: "https://ik.imagekit.io/tvlk/image/imageResource/2024/07/01/1719809679773-14c6c90e018ec70efcf04fd43a12744f.png",
    customerName: "Nguyễn Văn A",
    phoneNumber: "0901234567",
    date: "2024-11-10",
    status: "Confirmed",
    totalPrice: "500,000 VND",
    paid: true,
  },
  {
    hotelName: "Don Mueang Grand Hotel",
    image: "https://ik.imagekit.io/tvlk/image/imageResource/2024/07/01/1719809679773-14c6c90e018ec70efcf04fd43a12744f.png",
    customerName: "Trần Thị B",
    phoneNumber: "0907654321",
    date: "2024-12-01",
    status: "Pending",
    totalPrice: "350,000 VND",
    paid: false,
  },
  {
    hotelName: "Bangkok City Resort",
    image: "https://ik.imagekit.io/tvlk/image/imageResource/2024/07/01/1719809679773-14c6c90e018ec70efcf04fd43a12744f.png",
    customerName: "Lê Văn C",
    phoneNumber: "0909876543",
    date: "2024-12-15",
    status: "Cancelled",
    totalPrice: "0 VND",
    paid: false,
  },
];

function Reservation() {
  return (
    <ClientLayout top={10}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url("assets/images/home-decor-3.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
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
        <Typography variant="h2" fontWeight="bold" sx={{ fontSize: "3rem" }}>
          Lịch Sử Đặt Phòng
        </Typography>
        <Typography variant="h6" mt={2} sx={{ fontSize: "1.2rem", maxWidth: "500px" }}>
          Cập nhật thông tin và trạng thái của các lần đặt phòng của bạn.
        </Typography>
      </Box>

      {/* Lịch sử đặt phòng */}
      <Box mb={5} mt={5}>
        <Card sx={{ width: "100%", padding: 3, borderRadius: 5, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" mb={3} sx={{ color: "#333" }}>
              Lịch Sử Đặt Phòng
            </Typography>

            {/* Lặp qua lịch sử đặt phòng */}
            {reservationHistory.map((reservation, index) => (
              <Paper
                key={index}
                sx={{
                  background: "#f9f9f9",
                  padding: 3,
                  borderRadius: 3,
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  marginBottom: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {/* Hình ảnh khách sạn */}
                <Avatar
                  alt={reservation.hotelName}
                  src={reservation.image}
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: "#1a73e8" }}>
                    {reservation.hotelName}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: "#666" }}>
                    Người đặt: {reservation.customerName}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#999" }}>
                    Số điện thoại: {reservation.phoneNumber}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#444", fontSize: "0.9rem" }}>
                    Ngày đặt: {reservation.date}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", textAlign: "right" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color: reservation.status === "Confirmed" ? "green" : reservation.status === "Pending" ? "orange" : "red",
                    }}
                  >
                    Trạng thái: {reservation.status}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                    {reservation.totalPrice}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: reservation.paid ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    Thanh toán: {reservation.paid ? "Đã thanh toán" : "Chưa thanh toán"}
                  </Typography>
                </Box>
              </Paper>
            ))}

            {/* Nút quay lại */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 5,
                  padding: "10px 20px",
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                Trở lại
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </ClientLayout>
  );
}

export default Reservation;
