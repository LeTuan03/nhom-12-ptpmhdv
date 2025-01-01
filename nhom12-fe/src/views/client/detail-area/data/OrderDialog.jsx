import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import { Autocomplete, Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  formatDateNoTime,
  formatPrice,
  getCurrentUser,
} from "../../../../const/app-function";
import { appConst } from "../../../../const/app-const";
import { createBooking } from "../../../admin/manage-booking/booking-service";
import { createVNpayOrder } from "../../../../const/app-service";
import { useNavigate } from "react-router-dom";

export default function OrderDialog(props) {
  let { open, item, handleClose, handleOk = () => {} } = props;
  const [state, setState] = React.useState({});
  const navigate = useNavigate();
  const handleChange = (event) => {
    let { name, value } = event.target;
    setState((pre) => ({ ...pre, [name]: value }));
    if (name === "numberOfPeople") {
      setState((pre) => ({
        ...pre,
        totalPrice: value * state?.place?.pricePerPerson,
      }));
    }
  };

  const convertData = () => {
    return {
      id: state?.id,
      customerName: state?.customerName,
      phone: state?.phone,
      email: state?.email,
      placeId: state?.place?.id,
      placeName: state?.place?.name,
      placeImage: state?.place?.imageUrl,
      startDate: state?.startDate,
      numberOfPeople: state?.numberOfPeople,
      totalPrice: state?.totalPrice,
      specialRequests: state?.specialRequests,
      buyer: getCurrentUser(),
      statusRoom: appConst.STATUS_ROOM_BOOKING.EMPTY.name,
      statusOrder: appConst.STATUS_ORDER_BOOKING.WAIT.name,
    };
  };
  const handleFormSubmit = async () => {
    if(!getCurrentUser()) {
      toast.warn("Vui lòng đăng nhập trước khi đặt chỗ")
      return;
    }
    try {
      const payload = convertData();
      const data = await createBooking(payload);
      let orderPayload = {
        orderId: data?.data?.id,
        amount: data?.data?.totalPrice,
      };
      const vnPayOrder = await createVNpayOrder(orderPayload);
      if (vnPayOrder?.data?.code === appConst.CODE.SUCCEED) {
        window.location.href = vnPayOrder?.data?.data?.paymentUrl;
      }
      // toast.success("Thành công");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Có lỗi xảy ra vui lòng thử lại");
    } finally {
      // handleClose();
      // handleOk();
    }
  };

  React.useEffect(() => {
    setState((pre) => ({
      ...pre,
      ...item,
      startDate: formatDateNoTime(item?.startDate),
      place:
        item?.placeId || item?.place?.id
          ? {
              ...item?.place,
              id: item?.placeId || item?.place?.id,
              name: item?.placeName || item?.place?.name,
            }
          : null,
      statusRoom: appConst.LIST_STATUS_ROOM_BOOKING.find(
        (i) => i.name === item?.statusRoom
      ),
    }));
  }, [item]);

  return (
    <React.Fragment>
      <Grid container>
        <Dialog
          fullWidth
          maxWidth={"lg"}
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              handleFormSubmit();
            },
          }}
        >
          <DialogTitle>Thông tin đặt chỗ</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item lg={4} md={6} sm={12}>
                <SoftBox>
                  <SoftBox ml={0.5}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Tên khách hàng
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="text"
                    name="customerName"
                    value={state?.customerName || ""}
                    onChange={(event) => handleChange(event)}
                  />
                </SoftBox>
              </Grid>
              <Grid item lg={4} md={6} sm={12}>
                <SoftBox>
                  <SoftBox ml={0.5}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Email
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="text"
                    name="email"
                    value={state?.email || ""}
                    onChange={(event) => handleChange(event)}
                  />
                </SoftBox>
              </Grid>
              <Grid item lg={4} md={6} sm={12}>
                <SoftBox>
                  <SoftBox ml={0.5}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Số điện thoại
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="text"
                    name="phone"
                    value={state?.phone || ""}
                    onChange={(event) => handleChange(event)}
                  />
                </SoftBox>
              </Grid>
              <Grid item lg={4} md={6} sm={12}>
                <SoftBox>
                  <SoftBox ml={0.5}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Số người
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="number"
                    name="numberOfPeople"
                    value={state?.numberOfPeople || ""}
                    onChange={(event) => handleChange(event)}
                  />
                </SoftBox>
              </Grid>
              <Grid item lg={4} md={6} sm={12}>
                <SoftBox>
                  <SoftBox ml={0.5}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Ngày bắt đầu
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="date"
                    name="startDate"
                    value={state?.startDate || ""}
                    onChange={(event) => handleChange(event)}
                  />
                </SoftBox>
              </Grid>
              <Grid item lg={4} md={6} sm={12}>
                <SoftBox>
                  <SoftBox ml={0.5}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Tổng chi phí
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    disabled={true}
                    type="text"
                    name="totalPrice"
                    value={formatPrice(state?.totalPrice) || ""}
                    onChange={(event) => handleChange(event)}
                  />
                </SoftBox>
              </Grid>
              <Grid item lg={12} md={12} sm={12}>
                <SoftBox>
                  <SoftBox ml={0.5}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Yêu cầu đặc biệt
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="text"
                    name="specialRequests"
                    value={state?.specialRequests || ""}
                    onChange={(event) => handleChange(event)}
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              size="small"
              variant="contained"
              color="secondary"
              sx={{ color: "#fff" }}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              sx={{ color: "#fff" }}
            >
              Thanh toán
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </React.Fragment>
  );
}
OrderDialog.prototype = {
  open: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  handleOk: PropTypes.func.isRequired,
};
