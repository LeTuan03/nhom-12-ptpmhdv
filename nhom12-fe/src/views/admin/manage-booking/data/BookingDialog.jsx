import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import { Autocomplete, Avatar, Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { createBooking, updateBooking } from "../booking-service";
import { toast } from "react-toastify";
import { getAllUser } from "../../manage-user/user-service";
import { getAllDestination } from "../../manage-destination/destination-service";
import {
  formatDateNoTime,
  getCurrentUser,
} from "../../../../const/app-function";
import { getAllPlace } from "../../manage-place/place-service";
import { appConst } from "../../../../const/app-const";

export default function BookingDialog(props) {
  let { open, item, handleClose, handleOk = () => {} } = props;
  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    let { name, value } = event.target;
    setState((pre) => ({ ...pre, [name]: value }));
  };

  const handleChangeOption = (data, source) => {
    console.log(data);
    setState((pre) => ({ ...pre, [source]: data }));
  };

  const convertData = () => {
    return {
      id: state?.id,
      customerName: state?.customerName,
      phone: state?.phone,
      email: state?.email,
      placeId: state?.place?.id,
      placeName: state?.place?.name,
      startDate: state?.startDate,
      numberOfPeople: state?.numberOfPeople,
      totalPrice: state?.totalPrice,
      specialRequests: state?.specialRequests,
      buyer: state?.buyer,
      statusRoom: state?.statusRoom?.name,
      statusOrder: state?.statusOrder?.name,
    };
  };
  const handleFormSubmit = async () => {
    try {
      const payload = convertData();
      if (item?.id) {
        const data = await updateBooking(payload, item?.id);
        toast.success("Cập nhật thành công");
      } else {
        const data = await createBooking(payload);
        toast.success("Thêm mới thành công");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      handleClose();
      handleOk();
    }
  };
  const getListOptions = async () => {
    try {
      const listUser = await getAllUser();
      const listPlaces = await getAllPlace();
      setState((pre) => ({
        ...pre,
        ["listUser"]: listUser?.data,
        ["listPlaces"]: listPlaces?.data,
      }));
    } catch (e) {}
  };

  React.useEffect(() => {
    setState((pre) => ({
      ...pre,
      ...item,
      startDate: formatDateNoTime(item?.startDate),
      place: item?.placeId
        ? {
            id: item?.placeId,
            name: item?.placeName,
          }
        : null,
      statusRoom: appConst.LIST_STATUS_ROOM_BOOKING.find(
        (i) => i.name === item?.statusRoom
      ),
      statusOrder: appConst.LIST_STATUS_ORDER_BOOKING.find(
        (i) => i.name === item?.statusOrder
      ),
    }));
    getListOptions();
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
          <DialogTitle>Thêm mới/Cập nhật thông tin đặt chỗ</DialogTitle>
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
                      Trạng thái phòng
                    </SoftTypography>
                  </SoftBox>
                  <Autocomplete
                    options={appConst.LIST_STATUS_ROOM_BOOKING}
                    fullWidth
                    value={state?.statusRoom || null}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, data) =>
                      handleChangeOption(data, "statusRoom")
                    }
                    renderInput={(params) => <TextField {...params} />}
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
                      Tổng tiền
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    disabled={true}
                    type="number"
                    name="totalPrice"
                    value={state?.totalPrice || ""}
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
                      Người mua
                    </SoftTypography>
                  </SoftBox>
                  <Autocomplete
                    options={state?.listUser?.length ? state?.listUser : []}
                    fullWidth
                    value={state?.buyer || null}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, data) =>
                      handleChangeOption(data, "buyer")
                    }
                    renderInput={(params) => <TextField {...params} />}
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
                      Địa điểm
                    </SoftTypography>
                  </SoftBox>
                  <Autocomplete
                    options={
                      state?.listPlaces?.length
                        ? getCurrentUser()?.role !== appConst.ROLE.SUPPER_ADMIN.name
                          ? state?.listPlaces?.filter(
                              (i) => i?.owner?.id === getCurrentUser()?.id
                            )
                          : state?.listPlaces
                        : []
                    }
                    fullWidth
                    value={state?.place || null}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, data) =>
                      handleChangeOption(data, "place")
                    }
                    renderInput={(params) => <TextField {...params} />}
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
                      Trạng thái phiếu
                    </SoftTypography>
                  </SoftBox>
                  <Autocomplete
                    options={appConst.LIST_STATUS_ORDER_BOOKING}
                    fullWidth
                    value={state?.statusOrder || null}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, data) =>
                      handleChangeOption(data, "statusOrder")
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </SoftBox>
              </Grid>
              <Grid item lg={8} md={6} sm={12}>
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
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </React.Fragment>
  );
}
BookingDialog.prototype = {
  open: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  handleOk: PropTypes.func.isRequired,
};
