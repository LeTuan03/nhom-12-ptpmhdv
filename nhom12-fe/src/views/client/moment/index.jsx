import React, { useEffect, useState } from "react";
import ClientLayout from "layouts/authentication/components/ClientLayout";
import {
  Card,
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  Stack,
  Rating,
} from "@mui/material";
import SoftBox from "components/SoftBox";

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
import { formatPrice } from "../../../const/app-function";
import { getRatingById } from "./moment-service";
import SoftComment from "../../../components/SoftComment";

const Moment = ({ top = 10 }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({ item: {} });
  const handleSearch = async () => {
    if (!params?.id) return;
    try {
      const rate = await getRatingById(params?.id);
      setState({ listItems: [], rate: rate?.data, place: rate?.data?.place });
    } catch (error) {}
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSetState = (source, data) => {
    setState((pre) => ({ ...pre, [source]: data }));
  };

  return (
    <ClientLayout top={top}>
      {/* Room Moments */}
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
                </Grid>
              </Box>
              <Divider />
            </Grid>
          </Grid>

          <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center">
            {state?.rate?.buyer?.name}
          </Typography>
          <Typography variant="body1"> {state?.rate?.description}</Typography>
          <Stack direction="row" alignItems="center" spacing={1} marginY={2}>
            <Typography>Đánh giá:</Typography>
            <Rating
              defaultValue={Number(state?.rate?.rate)}
              value={Number(state?.rate?.rate)}
              readOnly
            />
          </Stack>
          <Box
            sx={{
              marginY: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src={state?.rate?.image}
              alt="Uploaded"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Divider />
        </Card>
      </SoftBox>{" "}
      <SoftBox mt={4}>
        <Card sx={{ padding: "20px", borderRadius: "10px", boxShadow: 3 }}>
          <SoftComment
            url={"http://127.0.0.1:5500/blog-single.html?" + params?.id}
          />
        </Card>
      </SoftBox>
    </ClientLayout>
  );
};

export default Moment;
