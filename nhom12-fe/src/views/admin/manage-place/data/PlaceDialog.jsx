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
import { formatDateNoTime, getCurrentUser } from "const/app-function";
import { createPlace, updatePlace } from "../place-service";
import { appConst } from "../../../../const/app-const";
import { toast } from "react-toastify";
import { getAllUser } from "../../manage-user/user-service";
import { getAllDestination } from "../../manage-destination/destination-service";
import { uploadImageV2 } from "../../../../const/app-service";
import { API_PATH_V2 } from "../../../../utils/axios-customize";

export default function PlaceDialog(props) {
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
  const handleImageChange = async (event) => {
    try {
      const newImage = event.target.files[0];
      if (newImage) {
        let formData = new FormData();
        formData.append("file", newImage);
        const data = await uploadImageV2(formData);
        let urlImageNew = API_PATH_V2 + "/public/image/" + data?.data?.name;
        setState((pre) => ({
          ...pre,
          imageUrl: urlImageNew || data?.data || "",
        }));
        // const reader = new FileReader();
        // reader.onload = () => {
        //   setState((pre) => ({ ...pre, ["imageUrl"]: reader.result }));
        // };
        // reader.readAsDataURL(newImage);
      }
    } catch (e) {}
  };
  const convertData = () => {
    return {
      id: state?.id,
      name: state?.name,
      imageUrl: state?.imageUrl,
      pricePerPerson: state?.pricePerPerson,
      destinationId: state?.destination?.id,
      destinationName: state?.destination?.name,
      bookings: state?.bookings,
      ownerId: state?.owner?.id,
      description: state?.description,
      maxPerson: state?.maxPerson,
    };
  };
  const handleFormSubmit = async () => {
    try {
      const payload = convertData();
      if (item?.id) {
        const data = await updatePlace(payload, item?.id);
        toast.success("Thành công");
      } else {
        const data = await createPlace(payload);
        toast.success("Thành công");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      handleClose();
      handleOk();
    }
  };
  const getListOptions = async () => {
    try {
      const listUser = await getAllUser();
      const listDestination = await getAllDestination();
      setState((pre) => ({
        ...pre,
        ["listUser"]: listUser?.data,
        ["listDestination"]: listDestination?.data,
      }));
    } catch (e) {}
  };

  React.useEffect(() => {
    setState((pre) => ({
      ...pre,
      ...item,
      destination: item?.destinationId
        ? {
            id: item?.destinationId,
            name: item?.destinationName,
          }
        : null,
      owner: item?.owner || getCurrentUser(),
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
          <DialogTitle>Thêm mới/Cập nhật thông tin địa điểm</DialogTitle>
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
                      Tên địa điểm
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="text"
                    name="name"
                    value={state?.name || ""}
                    disabled={state?.isView}
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
                      Chủ sở hữu
                    </SoftTypography>
                  </SoftBox>
                  <Autocomplete
                    disabled={
                      getCurrentUser()?.role !== appConst.ROLE.SUPPER_ADMIN.name
                    }
                    options={state?.listUser?.length ? state?.listUser : []}
                    fullWidth
                    value={state?.owner || null}
                    getOptionLabel={(option) => option.name}
                    disabled={state?.isView}
                    onChange={(event, data) =>
                      handleChangeOption(data, "owner")
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
                      Điểm đến
                    </SoftTypography>
                  </SoftBox>
                  <Autocomplete
                    options={
                      state?.listDestination?.length
                        ? state?.listDestination
                        : []
                    }
                    fullWidth
                    value={state?.destination || null}
                    getOptionLabel={(option) => option.name}
                    disabled={state?.isView}
                    onChange={(event, data) =>
                      handleChangeOption(data, "destination")
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
                      Giá mỗi người
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="number"
                    name="pricePerPerson"
                    value={state?.pricePerPerson || ""}
                    disabled={state?.isView}
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
                      Giới hạn số lượng người
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="number"
                    name="maxPerson"
                    value={state?.maxPerson || ""}
                    disabled={state?.isView}
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
                      Chi tiết
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="text"
                    name="description"
                    value={state?.description || ""}
                    disabled={state?.isView}
                    onChange={(event) => handleChange(event)}
                  />
                </SoftBox>
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                justifyContent={"center"}
                display={"flex"}
              >
                <Button
                  variant="contained"
                  sx={{ color: "#fff", marginTop: 1 }}
                  size="small"
                  disabled={state?.isView}
                >
                  <label htmlFor={`avataImage`}>Tải ảnh lên</label>
                </Button>
                <TextField
                  type="file"
                  id={`avataImage`}
                  accept="image/*"
                  style={{ display: "none" }}
                  disabled={state?.isView}
                  onChange={(e) => handleImageChange(e)}
                />
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                justifyContent={"center"}
                display={"flex"}
              >
                <Avatar
                  style={{ width: 250, height: 250, marginTop: 10 }}
                  sizes="large"
                  variant="rounded"
                  src={state?.imageUrl}
                />
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
            {!state?.isView && (
              <Button
                type="submit"
                size="small"
                variant="contained"
                color="primary"
                sx={{ color: "#fff" }}
              >
                Lưu
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Grid>
    </React.Fragment>
  );
}
PlaceDialog.prototype = {
  open: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  handleOk: PropTypes.func.isRequired,
};
