import React, { useEffect, useState } from "react";
import ClientLayout from "layouts/authentication/components/ClientLayout";
import { Card, Typography, Box, Button, Avatar, Paper } from "@mui/material";
import {
  formatPrice,
  formatTimestampToDate,
  getCurrentUser,
} from "../../../const/app-function";
import { getByBuyerIdBooking, updateStatusBooking } from "../../admin/manage-booking/booking-service";
import { useNavigate } from "react-router-dom";
import RatingComponent from "./data/RatingComponent";
import { appConst } from "../../../const/app-const";
import SoftConfirmDialog from "../../../components/SoftConfirmDialog";
import { deletePlace } from "../../admin/manage-place/place-service";
import { toast } from "react-toastify";

function Reservation() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [state, setState] = useState({ item: {} });

  const handleSearch = async () => {
    if (!user?.id) return;
    try {
      const listBooking = await getByBuyerIdBooking(user?.id);

      setState({ listItems: [], listBooking: listBooking?.data });
    } catch (error) {}
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleNavigate = () => {
    navigate("/");
  };

  const handleChange = (reservation) => {
    const updatedList = state.listBooking.map((item) => {
      if (reservation?.id === item.id) {
        return {
          ...item,
          checked: !item?.checked,
        };
      } else {
        return item;
      }
    });

    setState((pre) => ({ ...pre, listBooking: updatedList }));
  };

  const handleSetState = (source, data) => {
    setState((pre) => ({ ...pre, [source]: data }))
  }

  const handleClose = () => {
    handleSetState("item", {})
    handleSetState("openConfirm", false)
  };

  const handleCancle = (item) => {
    handleSetState("item", item)
    handleSetState("openConfirm", true)
  }

  const handleYes = async () => {
    try {
      const payload = {
        bookingId: state?.item?.id,
        statusOrder: appConst.STATUS_ORDER_BOOKING.CANCEL.name
      }
      const data = await updateStatusBooking(payload);
      console.log(data);
      toast.success("Hủy thành công. Vui lòng kiểm tra tin nhắn của bạn.");
    } catch (error) {
      toast.warn("Có lỗi xảy ra vui lòng thử lại");
    } finally {
      handleClose();
      handleSearch();
    }
  }
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
        <Typography variant="h6" mt={2} sx={{ fontSize: "1.2rem" }}>
          Cập nhật thông tin và trạng thái của các lần đặt phòng của bạn.
        </Typography>
      </Box>

      {/* Lịch sử đặt phòng */}
      <Box mb={5} mt={5}>
        <Card
          sx={{
            width: "100%",
            padding: 3,
            borderRadius: 5,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={3}
              sx={{ color: "#333" }}
            >
              Lịch Sử Đặt Phòng
            </Typography>

            {/* Lặp qua lịch sử đặt phòng */}
            {state?.listBooking?.map((reservation, index) => (
              <Paper
                key={index}
                sx={{
                  background: "#f9f9f9",
                  padding: 3,
                  borderRadius: 3,
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  marginBottom: 3,
                  gap: 3,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Paper
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    background: "#f9f9f9",
                    padding: 3,
                    borderRadius: 3,
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    marginBottom: 3,
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
                    alt={reservation?.placeName}
                    src={reservation?.placeImage}
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "#1a73e8" }}
                    >
                      {reservation.placeName}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#999" }}>
                      Người đặt: {reservation.customerName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#444", fontSize: "0.9rem" }}
                    >
                      Số điện thoại: {reservation.phone}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#444", fontSize: "0.9rem" }}
                    >
                      Ngày đặt: {formatTimestampToDate(reservation.startDate)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      textAlign: "right",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        color:
                          reservation?.statusOrder ===
                          appConst.STATUS_ORDER_BOOKING.SOLD.name
                            ? "green"
                            : reservation?.statusOrder ===
                              appConst.STATUS_ORDER_BOOKING.WAIT.name
                            ? "orange"
                            : "red",
                      }}
                    >
                      Trạng thái: {reservation?.statusOrder}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#333" }}
                    >
                      Tổng chi phí: {formatPrice(reservation.totalPrice)}
                    </Typography>
                    {reservation?.statusOrder ===
                      appConst.STATUS_ORDER_BOOKING.WAIT.name && (
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
                        onClick={() => handleCancle(reservation)}
                      >
                        <span style={{ color: "#fff" }}> Hủy đặt chỗ </span>
                      </Button>
                    )}
                    {!reservation?.isRated &&
                      reservation?.statusOrder ===
                        appConst.STATUS_ORDER_BOOKING.SOLD.name && (
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
                          onClick={() => handleChange(reservation)}
                        >
                          <span style={{ color: "#fff" }}> Đánh giá </span>
                        </Button>
                      )}
                    {/*<Typography*/}
                    {/*  variant="body2"*/}
                    {/*  sx={{*/}
                    {/*    color: reservation.paid ? "green" : "red",*/}
                    {/*    fontWeight: "bold",*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  Thanh toán:{" "}*/}
                    {/*  {reservation.paid ? "Đã thanh toán" : "Chưa thanh toán"}*/}
                    {/*</Typography>*/}
                  </Box>
                </Paper>
                <Paper
                  sx={{
                    background: "#f9f9f9",
                  }}
                >
                  <RatingComponent
                    checked={reservation?.checked}
                    item={reservation}
                    handleOk={handleSearch}
                  />
                </Paper>
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
                onClick={() => handleNavigate()}
              >
                <span style={{ color: "#fff" }}> Về trang chủ</span>
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
      {state?.openConfirm && <SoftConfirmDialog title={"Bạn có chắc chắc muốn hủy đặt nơi này? \nLiên hệ với chủ địa điểm để được hoàn tiền."} open={state?.openConfirm} handleClose={handleClose} handleOk={handleYes} />}
    </ClientLayout>
  );
}

export default Reservation;
