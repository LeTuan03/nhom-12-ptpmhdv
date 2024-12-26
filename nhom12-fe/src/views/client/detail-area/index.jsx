import React, { useState } from "react";
import ClientLayout from "layouts/authentication/components/ClientLayout";
import { Card, Grid, Typography, Box, Button, Divider } from "@mui/material";
import SoftBox from "components/SoftBox";

import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import { LocalHospital, SmokingRooms, Shower, Balcony, AcUnit } from '@mui/icons-material';

const Detail = ({ top = 10 }) => {
  // Danh sách các ảnh trong banner
  const bannerImages = [homeDecor1, homeDecor2, homeDecor3];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hàm thay đổi ảnh chính khi nhấn vào ảnh nhỏ
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <ClientLayout top={top}>
      {/* Hero Section */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        {/* Ảnh chính */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${bannerImages[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            borderRadius: "8px",
            transition: "background-image 1s ease-in-out",
          }}
        >
         
        </Box>

        {/* Các ảnh thu nhỏ nằm dưới ảnh chính */}
        <Box
          sx={{
            flex: 0.5,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginLeft: "20px",
          }}
        >
          {bannerImages.map((image, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                height: "100px",
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "pointer",
                border: currentIndex === index ? "2px solid #fff" : "2px solid transparent",
                transition: "all 0.3s ease-in-out",
              }}
              onClick={() => handleThumbnailClick(index)} // Khi click vào ảnh thu nhỏ, đổi ảnh chính
            >
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Room Details */}
      <SoftBox mt={4}>
        <Card sx={{ padding: "20px", borderRadius: "10px", boxShadow: 3 }}>
          {/* Header */}
          <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center">
            Twin With Balcony
          </Typography>
          <Divider />
          
          {/* Room Info */}
          <Grid container spacing={3} mt={3}>
            <Grid item xs={12} md={4}>
              <img
                src="https://ik.imagekit.io/tvlk/image/imageResource/2024/07/01/1719809679773-14c6c90e018ec70efcf04fd43a12744f.png?tr=q-40,c-at_max,w-500,h-500"
                alt="Twin Room"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Chi tiết phòng
              </Typography>
              <Box mb={2}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <LocalHospital sx={{ color: "#4caf50", marginRight: 1 }} />
                      <Typography variant="body1">📐 Diện tích: 30m²</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <SmokingRooms sx={{ color: "#f44336", marginRight: 1 }} />
                      <Typography variant="body1">🚭 Không hút thuốc</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <Shower sx={{ color: "#2196f3", marginRight: 1 }} />
                      <Typography variant="body1">🛁 Phòng tắm với vòi sen</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <Balcony sx={{ color: "#ffeb3b", marginRight: 1 }} />
                      <Typography variant="body1">☀️ Ban công/Hiên</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <AcUnit sx={{ color: "#03a9f4", marginRight: 1 }} />
                      <Typography variant="body1">❄️ Điều hòa không khí</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Divider />

              {/* Pricing Options */}
              <Box mt={3}>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                  Tùy chọn giá phòng
                </Typography>
                
                {/* Pricing Option 1 */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f5f5f5",
                    marginBottom: "15px",
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      Không bao gồm bữa sáng
                    </Typography>
                    <Typography variant="body2">Không hoàn tiền</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" color="green" textAlign="right">
                      625,330 VND
                    </Typography>
                    <Typography variant="body2" textAlign="right">
                      4 phòng còn trống!
                    </Typography>
                  </Box>
                  <Button variant="contained" color="primary" sx={{ borderRadius: "8px" }}>
                    Chọn phòng
                  </Button>
                </Box>

                {/* Pricing Option 2 */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      Không bao gồm bữa sáng
                    </Typography>
                    <Typography variant="body2">Chính sách hoàn tiền áp dụng</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" color="green" textAlign="right">
                      641,364 VND
                    </Typography>
                    <Typography variant="body2" textAlign="right">
                      1 phòng còn trống!
                    </Typography>
                  </Box>
                  <Button variant="contained" color="primary" sx={{ borderRadius: "8px" }}>
                    Chọn phòng
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </SoftBox>
    </ClientLayout>
  );
};

export default Detail;
