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
import { formatDateNoTime } from "const/app-function";
import { createDestination, updateDestination } from "../destination-service";
import { appConst } from "../../../../const/app-const";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { a11yProps, CustomTabPanel } from "../../../../utils/CustomTabPanel";
import Tabs from "@mui/material/Tabs";
import { getAllContinents } from "../../manage-continents/continents-service";
import MuiTableDestination from "./MuiTableDestination";
import { getAllTourtypes } from "../../manage-category/tourtype-service";

export default function DestinationDialog(props) {
  let { open, item, handleClose, handleOk = () => {} } = props;
  const [state, setState] = React.useState({
    continent: "",
    tourTypes: [],
    selectedTourType: null,
    city: null,
    country: null,
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    setState((pre) => ({ ...pre, [name]: value }));
  };

  const handleChangeOption = (data, source) => {
    console.log(data, source);
    setState((pre) => ({ ...pre, [source]: data }));
  };

  const handleImageChange = (event) => {
    const newImage = event.target.files[0];
    if (newImage) {
      console.log(newImage);
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        setState((pre) => ({ ...pre, image: reader.result }));
      };
      reader.readAsDataURL(newImage);
    }
  };

  const convertData = () => {
    return {
      name: state?.name,
      description: state?.description,
      location: state?.location,
      rating: state?.rating,
      entryFee: state?.entryFee,
      openingHours: state?.openingHours,
      contactInfo: state?.contactInfo,
      image: "state?.image",
      continent: state?.continent,
      country: state?.country,
      city: state?.city,
      tourTypes: state?.tourTypes,
    };
  };
  const handleFormSubmit = async () => {
    try {
      const payload = convertData();
      if (item?.id) {
        const data = await updateDestination(payload, item?.id);
        console.log(data);
      } else {
        const data = await createDestination(payload);
        console.log(data);
      }
    } catch (error) {
    } finally {
      handleClose();
      handleOk();
    }
  };

  const getListOptions = async () => {
    try {
      const listConstinents = await getAllContinents();
      const listTourtypes = await getAllTourtypes();
      setState((pre) => ({
        ...pre,
        ["listConstinents"]: listConstinents?.data,
        ["listTourtypes"]: listTourtypes?.data,
      }));
    } catch (e) {}
  };

  React.useEffect(() => {
    setState((pre) => ({
      ...pre,
      ...item,
      birthday: formatDateNoTime(item?.birthday),
      role:
        appConst.LIST_ROLE.find((x) => x.name === item?.role) ||
        appConst.ROLE.USER,
    }));
    getListOptions();
  }, [item]);
  const [value, setValue] = React.useState(0);

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = (row) => {
    let updateTourTypes = state?.tourTypes?.filter(
      (item) => item.id !== row.id
    );
    setState((pre) => ({
      ...pre,
      tourTypes: updateTourTypes,
    }));
  };

  const handleAddTourType = () => {
    let isExist = state?.tourTypes?.find(
      (item) => item?.id === state?.selectedTourType?.id
    );
    if (isExist) return;
    setState((pre) => ({
      ...pre,
      tourTypes: [
        { ...state?.selectedTourType },
        ...(state?.tourTypes.length ? state?.tourTypes : []),
      ],
    }));
  };

  return (
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
        <DialogTitle>Thêm mới/Cập nhật thông tin điểm đến</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                defaultValue={value}
                onChange={handleChangeTabs}
                aria-label="basic tabs example"
              >
                <Tab label="Thông tin chung" {...a11yProps(0)} />
                <Tab label="Loại hình du lịch" {...a11yProps(1)} />
                <Tab label="Ảnh  bìa" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
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
                        Vị trí
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="text"
                      name="location"
                      value={state?.location || ""}
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
                        Thông tin liên lạc
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="text"
                      name="contactInfo"
                      value={state?.contactInfo || ""}
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
                        Lục địa
                      </SoftTypography>
                    </SoftBox>
                    <Autocomplete
                      options={state?.listConstinents || []}
                      fullWidth
                      value={state?.continent || null}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, data) =>
                        handleChangeOption(data, "continent")
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
                        Đất nước
                      </SoftTypography>
                    </SoftBox>
                    <Autocomplete
                      options={
                        state?.continent?.countries?.length
                          ? state?.continent?.countries
                          : []
                      }
                      fullWidth
                      value={state?.country || null}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, data) =>
                        handleChangeOption(data, "country")
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
                        Thành phố
                      </SoftTypography>
                    </SoftBox>
                    <Autocomplete
                      options={
                        state?.country?.cities?.length
                          ? state?.country?.cities
                          : []
                      }
                      fullWidth
                      value={state?.city || null}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, data) =>
                        handleChangeOption(data, "city")
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
                        Đánh giá
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="text"
                      name="rating"
                      value={state?.rating || ""}
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
                        Giờ mở cửa
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="text"
                      name="openingHours"
                      value={state?.openingHours || ""}
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
                        Phí vào
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="text"
                      name="entryFee"
                      value={state?.entryFee || ""}
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
                        Miêu tả chi tiết
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="text"
                      name="description"
                      value={state?.description || ""}
                      onChange={(event) => handleChange(event)}
                    />
                  </SoftBox>
                </Grid>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Grid container spacing={2}>
                <Grid item lg={10} md={10} sm={12}>
                  <SoftBox>
                    <SoftBox ml={0.5}>
                      <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        Loại hình du lịch
                      </SoftTypography>
                    </SoftBox>
                    <Autocomplete
                      options={
                        state?.listTourtypes?.length ? state?.listTourtypes : []
                      }
                      fullWidth
                      value={state?.selectedTourType || null}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, data) =>
                        handleChangeOption(data, "selectedTourType")
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </SoftBox>
                </Grid>
                <Grid
                  item
                  lg={2}
                  md={2}
                  sm={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "25px",
                  }}
                >
                  <SoftBox>
                    <Button
                      disabled={!state?.selectedTourType}
                      type="button"
                      size="small"
                      variant="contained"
                      color="primary"
                      sx={{ color: "#fff" }}
                      onClick={() => handleAddTourType()}
                    >
                      Thêm
                    </Button>
                  </SoftBox>
                </Grid>
                <Grid item lg={12} md={12} sm={12}>
                  <MuiTableDestination
                    data={state?.tourTypes || []}
                    handleDelete={handleDelete}
                  />
                </Grid>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Grid container spacing={2}>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  justifyContent={"center"}
                  display={"flex"}
                  sx={{ marginTop: 2 }}
                >
                  <Button
                    variant="contained"
                    sx={{ color: "#fff" }}
                    size="small"
                  >
                    <label htmlFor={`image`}>Tải ảnh lên</label>
                  </Button>
                  <TextField
                    type="file"
                    id={`image`}
                    accept="image/*"
                    style={{ display: "none" }}
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
                    style={{ width: "100%", height: "100%", marginTop: 10 }}
                    sizes="large"
                    variant="rounded"
                    src={state?.image}
                  />
                </Grid>
              </Grid>
            </CustomTabPanel>
          </Box>
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
  );
}
DestinationDialog.prototype = {
  open: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  handleOk: PropTypes.func.isRequired,
};
