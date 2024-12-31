import React, { useEffect, useState } from "react";
import ClientLayout from "layouts/authentication/components/ClientLayout";
import { Card, Grid, Typography, Box, Button, Divider } from "@mui/material";
import SoftBox from "components/SoftBox";

import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import {
  LocalHospital,
  SmokingRooms,
  Shower,
  Balcony,
  AcUnit,
  AttachMoney,
  HomeRepairService,
  EmailOutlined,
  Phone,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaceById } from "../../admin/manage-place/place-service";
import OrderDialog from "./data/OrderDialog";
import { formatPrice } from "../../../const/app-function";
import SoftComment from "../../../components/SoftComment";

const Detail = ({ top = 10 }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({ item: {} });
  const [openEdit, setOpenEdit] = useState(false);
  const handleSearch = async () => {
    if (!params?.id) return;
    try {
      const place = await getPlaceById(params?.id);
      setState({ listItems: [], place: place?.data });
    } catch (error) {}
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleOpenDialog = () => {
    setOpenEdit(true);
    handleSetState("item", { place: state?.place });
  };
  const handleClose = () => {
    setOpenEdit(false);
    handleSetState("item", {});
    handleSetState("openConfirm", false);
  };

  const handleSetState = (source, data) => {
    setState((pre) => ({ ...pre, [source]: data }));
  };

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
        ></Box>

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
                border:
                  currentIndex === index
                    ? "2px solid #fff"
                    : "2px solid transparent",
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
            {state?.place?.name}
          </Typography>
          <Typography variant="body1"> {state?.place?.description}</Typography>
          <Divider />

          {/* Room Info */}
          <Grid container spacing={3} mt={3}>
            <Grid item xs={12} md={4}>
              <img
                src={state?.place?.imageUrl}
                alt="imageUrl"
                style={{
                  width: "100%",
                  maxHeight: "70vh",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Chi tiết
              </Typography>
              <Box mb={2}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <LocalHospital
                        sx={{ color: "#4caf50", marginRight: 1 }}
                      />
                      <Typography variant="body1">Diện tích: 30m²</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <SmokingRooms sx={{ color: "#f44336", marginRight: 1 }} />
                      <Typography variant="body1">Không hút thuốc</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <Shower sx={{ color: "#2196f3", marginRight: 1 }} />
                      <Typography variant="body1">
                        Phòng tắm với vòi sen
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <Balcony sx={{ color: "#ffeb3b", marginRight: 1 }} />
                      <Typography variant="body1"> Ban công/Hiên</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <AcUnit sx={{ color: "#03a9f4", marginRight: 1 }} />
                      <Typography variant="body1">
                        Điều hòa không khí
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1">🌐 Wi-Fi miễn phí</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1" fontWeight="bold">
                        👨‍👩‍👧‍👦 Số người tối đa: 4
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Thông tin liên hệ
              </Typography>
              <Box mb={2}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <HomeRepairService
                        sx={{ color: "#4caf50", marginRight: 1 }}
                      />
                      <Typography variant="body1">
                        Tên chủ sở hữu: {state?.place?.owner?.name}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <EmailOutlined
                        sx={{ color: "#f44336", marginRight: 1 }}
                      />
                      <Typography variant="body1">
                        Email liên hệ: {state?.place?.owner?.email}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <Phone sx={{ color: "#03a9f4", marginRight: 1 }} />
                      <Typography variant="body1">
                        Số điện thoại: {state?.place?.owner?.phone}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <button
                      onClick={handleOpenDialog}
                      className="button"
                      style={{ marginTop: "20px" }}
                    >
                      ĐẶT TRƯỚC
                    </button>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
            </Grid>
          </Grid>
        </Card>
      </SoftBox>{" "}
      <SoftBox mt={4}>
        <Card sx={{ padding: "20px", borderRadius: "10px", boxShadow: 3 }}>
          <SoftComment
            url={"http://127.0.0.1:5500/blog-single.html?" + params?.id}
          />
        </Card>
      </SoftBox>
      {openEdit && (
        <OrderDialog
          open={openEdit}
          handleClose={handleClose}
          handleOk={handleSearch}
          item={state?.item}
        />
      )}
    </ClientLayout>
  );
};

export default Detail;
