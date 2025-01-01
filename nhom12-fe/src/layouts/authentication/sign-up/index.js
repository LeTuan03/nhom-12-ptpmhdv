

import { useEffect, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import { register } from "../sign-in/sign-service";
import * as React from "react";
import { appConst } from "../../../const/app-const";
import { toast } from "react-toastify";
import { removeAuth } from "../../../const/app-service";

function SignUp() {
  const [agreement, setAgremment] = useState(true);

  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    let { name, value } = event.target;
    setState((pre) => ({ ...pre, [name]: value }));
  };

  const handleSetAgremment = () => setAgremment(!agreement);

  const convertData = () => {
    return {
      avatar: state?.avatar,
      birthday: state?.birthday,
      email: state?.email,
      gender: state?.gender,
      name: state?.name,
      password: state?.password,
      phone: state?.phone,
      role: appConst.ROLE.USER.name,
      username: state?.username,
    };
  };
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      let payload = convertData();
      const data = await register(payload);
      toast.success("Đăng ký thành công tài khoản")
      console.log(data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    removeAuth();
  }, []);

  return (
    <BasicLayout
      title="Welcome!"
      description="Sử dụng miễn phí các biểu mẫu tuyệt vời này để đăng nhập hoặc tạo tài khoản mới trong dự án của bạn."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Đăng nhập với
              </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <form  onSubmit={handleRegister}>
            <SoftBox mb={2}>
              <SoftInput name={"name"} placeholder="Nhập họ và tên" onChange={handleChange} />
            </SoftBox> <SoftBox mb={2}>
              <SoftInput name={"username"} placeholder="Nhập tên đăng nhập" onChange={handleChange} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput name={"email"} type="email" placeholder="Nhập địa chỉ email" onChange={handleChange} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput name={"password"} type="password" placeholder="Nhập mật khẩu" onChange={handleChange}/>
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;Tôi đồng ý&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Điều khoản và Điều kiện
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton type={"submit"} variant="gradient" color="dark" fullWidth>
                Đăng ký
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Đã có tài khoản?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Đăng nhập
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </form>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
