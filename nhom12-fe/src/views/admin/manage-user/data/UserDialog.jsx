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
import { createUser, updateUser } from "../user-service";
import { appConst } from "../../../../const/app-const";
import { register } from "../../../../layouts/authentication/sign-in/sign-service";

export default function UserDialog(props) {
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
  const handleImageChange = (event) => {
    const newImage = event.target.files[0];
    if (newImage) {
      console.log(newImage);
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
      };
      reader.readAsDataURL(newImage);
    }
  };
  const convertData = () => {
    return {
      avatar: state?.avatar,
      birthday: state?.birthday,
      email: state?.email,
      gender: state?.gender,
      name: state?.name,
      password: state?.password,
      phone: state?.phone,
      role: state?.role?.name,
      username: state?.username,
    };
  };
  const handleFormSubmit = async () => {
    try {
      const payload = convertData();

      if (item?.id) {
        const data = await updateUser(payload, item?.id);
        console.log(data);
      } else {
        const data = await register(payload);
        console.log(data);
      }
    } catch (error) {
    } finally {
      handleClose();
      handleOk();
    }
  };

  React.useEffect(() => {
    setState((pre) => ({
      ...pre,
      ...item,
      birthday: formatDateNoTime(item?.birthday),
      role: appConst.LIST_ROLE.find(x => x.name === item?.role) || appConst.ROLE.USER,
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
          <DialogTitle>Thêm mới/Cập nhật thông tin tài khoản</DialogTitle>
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
                      Tên đăng nhập
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="text"
                    name="username"
                    value={state?.username || ""}
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
                      Họ và tên
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
                      Mật khẩu
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="password"
                    name="password"
                    value={state?.password || ""}
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
                      Email
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="email"
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
                      Ngày sinh
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="date"
                    name="birthday"
                    value={state?.birthday || ""}
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
                      Giới tính
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="text"
                    name="gender"
                    value={state?.gender || ""}
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
                      Vai trò
                    </SoftTypography>
                  </SoftBox>
                  <Autocomplete
                    options={appConst.LIST_ROLE}
                    fullWidth
                    value={state?.role || null}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, data) => handleChangeOption(data, "role")}
                    renderInput={(params) => <TextField {...params} />}
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
                >
                  <label htmlFor={`avataImage`}>Tải ảnh lên</label>
                </Button>
                <TextField
                  type="file"
                  id={`avataImage`}
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
                  style={{ width: 250, height: 250, marginTop: 10 }}
                  sizes="large"
                  variant="rounded"
                  src={state?.avatar}
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
UserDialog.prototype = {
  open: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  handleOk: PropTypes.func.isRequired,
};
