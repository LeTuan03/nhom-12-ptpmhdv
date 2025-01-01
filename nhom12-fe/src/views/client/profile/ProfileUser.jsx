import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Grid,
  Button,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
} from "@mui/material";
import { PhotoCamera, Delete as DeleteIcon } from "@mui/icons-material";
import SoftBox from "components/SoftBox"; // Giả sử SoftBox là một component đã được định nghĩa trong dự án
import SoftInput from "components/SoftInput"; // Giả sử SoftInput là một component đã được định nghĩa trong dự án
import SoftTypography from "components/SoftTypography"; // Giả sử SoftTypography là một component đã được định nghĩa trong dự án
import { getCurrentUser } from "const/app-function";
import { changePassword, updateUser, getUser } from "./user-service";
import { formatDateNoTime } from "const/app-function";
import { uploadImageV2 } from "const/app-service";
import { API_PATH_V2 } from "utils/axios-customize";
import { toast } from "react-toastify";

function ProfileUser() {
  const currentUser = getCurrentUser();
  const [state, setState] = useState({});
  const [userData, setUserData] = useState({
    id: "",
    avatar: "",
    name: "",
    birthday: "",
    password: "",
    gender: "",
    address: "",
    email: "",
    phone: "",
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  const handleChange = (event) => {
    let { name, value } = event.target;
    setState((pre) => ({ ...pre, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const infoResponse = await getUser();
      if (infoResponse?.data) {
        setState((pre) => ({
          ...pre,
          ...infoResponse.data,
          birthday: formatDateNoTime(new Date(infoResponse?.data?.birthday)),
        }));
      } else {
      }
    } catch (err) {
      console.error("Lỗi:", err);
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);
  console.log({
    avatar: state?.avatar,
    username: state?.username,
    name: state?.name,
    birthday: state?.birthday,
    gender: state?.gender,
    role: state?.role,
    email: state?.email,
    phone: state?.phone,
  });

  const handleSave = async () => {
    try {
      const updatedData = {
        avatar: state?.avatar,
        username: state?.username,
        name: state?.name,
        birthday: state?.birthday,
        gender: state?.gender,
        role: state?.role,
        email: state?.email,
        phone: state?.phone,
      };

      const response = await updateUser(updatedData, state?.id);
      if (response?.data) {
        setUserData(response.data);
        toast.success("Dữ liệu đã được lưu thành công!");
      } else {
        toast.error("Lỗi khi lưu dữ liệu, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      toast.error("Lỗi khi lưu dữ liệu, vui lòng thử lại!");
    }
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
          avatar: urlImageNew || data?.data || "",
        }));
      }
    } catch (e) {}
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận không khớp!");
      return;
    }

    if (newPassword.length < 8 || !/\d/.test(newPassword)) {
      alert("Mật khẩu phải có ít nhất 8 ký tự, bao gồm cả số và chữ cái!");
      return;
    }

    try {
      const response = await changePassword(
        currentUser.username,
        newPassword,
        oldPassword
      ); // Giả sử API hỗ trợ thay đổi mật khẩu
      toast.success("Đổi mật khẩu thành công!");
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại. Vui lòng thử lại!");
    } finally {
      setOpenPasswordDialog(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div>
      <Card
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 1000,
          margin: "auto",
          marginTop: 0,
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={3}>
          {/* Avatar Section */}
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                marginBottom: 2,
                borderRadius: "50%",
                objectFit: "cover",
                backgroundColor: "#f0f0f0",
              }}
              src={state?.avatar || ""}
            >
              {/* Nếu không có ảnh, hiển thị chữ cái đầu tiên của tên */}
              {state?.fullName ? state?.fullName[0] : "U"}
            </Avatar>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="avatar-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="avatar-upload">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginTop: 1 }}
            >
              Nhấn để thay đổi ảnh đại diện
            </Typography>
          </Grid>

          {/* Personal Data Section */}
          <Grid item xs={8}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Dữ liệu cá nhân
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SoftBox mb={1}>
                  <SoftBox mb={1} ml={0.5}>
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
                    placeholder=""
                    name="username"
                    disabled={true}
                    value={state?.username}
                    onChange={handleChange}
                  />
                </SoftBox>
              </Grid>
              {/* Tên đầy đủ */}
              <Grid item xs={12}>
                <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
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
                    placeholder="Nhập họ và tên"
                    name="name"
                    value={state?.name}
                    onChange={handleChange}
                  />
                </SoftBox>
                <Typography variant="body2" color="textSecondary">
                  Tên trong hồ sơ được rút ngắn từ họ tên của bạn.
                </Typography>
              </Grid>
              {/* Mật khẩu */}
              <Grid item xs={12}>
                <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Mật khẩu
                    </SoftTypography>
                  </SoftBox>
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <SoftInput
                        type="password"
                        placeholder="Nhập mật khẩu"
                        name="password"
                        value={state?.password || ""}
                        onChange={handleChange}
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenPasswordDialog(true)}
                      >
                        <span style={{ color: "#fff" }}>Đổi mật khẩu</span>
                      </Button>
                    </Grid>
                  </Grid>
                  <Typography variant="body2" color="textSecondary">
                    Hãy đảm bảo mật khẩu có ít nhất 8 ký tự, bao gồm cả chữ hoa,
                    chữ thường và số.
                  </Typography>
                </SoftBox>
              </Grid>

              {/* Giới tính */}
              <Grid item xs={6}>
                <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Giới tính
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    placeholder="Chọn giới tính"
                    name="gender"
                    value={state?.gender}
                    onChange={handleChange}
                  />
                </SoftBox>
              </Grid>

              {/* Ngày sinh */}
              <Grid item xs={6}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    Ngày sinh
                  </SoftTypography>
                </SoftBox>
                <TextField
                  fullWidth
                  type="date"
                  name="birthday"
                  value={state?.birthday}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Email
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    placeholder="Nhập email"
                    name="email"
                    value={state?.email}
                    onChange={handleChange}
                  />
                </SoftBox>
              </Grid>

              <Grid item xs={6}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    Số điện thoại
                  </SoftTypography>
                </SoftBox>
                <TextField
                  fullWidth
                  type="text"
                  name="phone"
                  value={state?.phone}
                  onChange={handleChange}
                />
              </Grid>

              {/* Action buttons */}
              <Grid item xs={12} textAlign="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  <span style={{ color: "#fff" }}> Xác nhận</span>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      {/* Password Dialog */}
      <Dialog
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
      >
        <DialogTitle>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Đổi mật khẩu
          </SoftTypography>
        </DialogTitle>
        <DialogContent>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Mật khẩu cũ
          </SoftTypography>
          <TextField
            autoFocus
            margin="dense"
            type="password"
            fullWidth
            value={oldPassword} // Trạng thái mật khẩu cũ
            onChange={(e) => setOldPassword(e.target.value)}
            InputProps={{
              style: { textAlign: "center", opacity: 0.7 },
            }}
          />
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Mật khẩu mới
          </SoftTypography>
          <TextField
            margin="dense"
            type="password"
            fullWidth
            value={newPassword} // Trạng thái mật khẩu mới
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              style: { textAlign: "center", opacity: 0.7 },
            }}
          />
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Xác nhận mật khẩu mới
          </SoftTypography>
          <TextField
            margin="dense"
            type="password"
            fullWidth
            value={confirmPassword} // Trạng thái xác nhận mật khẩu
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              style: { textAlign: "center", opacity: 0.7 },
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenPasswordDialog(false)}
            color="secondary"
          >
            Hủy
          </Button>
          <Button onClick={handlePasswordChange} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfileUser;
