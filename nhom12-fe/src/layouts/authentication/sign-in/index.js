import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { getUser, login } from "./sign-service";
import { appConst } from "const/app-const";
import { removeAuth } from "../../../const/app-service";

function SignIn() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const [state, setState] = useState({});
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleSetState = (data, source) => {
    setState((pre) => ({ ...pre, [source]: data }));
  };

  const getUserInfo = async () => {
    try {
      const data = await getUser();
      if (data.status === appConst.CODE.SUCCEED) {
        sessionStorage.setItem("current-user", JSON.stringify(data?.data));
        if (
          [appConst.ROLE.SUPPER_ADMIN.name, appConst.ROLE.ADMIN.name].includes(
            data?.data?.role
          )
        ) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const data = await login(state);
      if (data.status === appConst.CODE.SUCCEED) {
        sessionStorage.setItem("access_token", data?.data);
        await getUserInfo();
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  useEffect(() => {
    removeAuth();
  }, []);
  return (
    <CoverLayout
      title="Welcome back"
      description="Nhập tên đăng nhập và mật khẩu của bạn để đăng nhập"
      image={curved9}
    >
      <form>
        <SoftBox component="form" role="form">
          <SoftBox mb={2}>
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
              placeholder="Nhập tên đăng nhập"
              name="username"
              value={state?.username || ""}
              onChange={(event) =>
                handleSetState(event.target.value, "username")
              }
            />
          </SoftBox>
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
            <SoftInput
              type="password"
              placeholder="Nhập mật khẩu"
              name="password"
              value={state?.password || ""}
              onChange={(event) =>
                handleSetState(event.target.value, "password")
              }
            />
          </SoftBox>
          <SoftBox display="flex" alignItems="center">
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <SoftTypography
              variant="button"
              fontWeight="regular"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;Nhớ mật khẩu
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={4} mb={1}>
            <SoftButton
              variant="gradient"
              color="info"
              fullWidth
              type="button"
              onClick={() => handleFormSubmit()}
            >
              Đăng nhập
            </SoftButton>
          </SoftBox>
          <SoftBox mt={3} textAlign="center">
            <SoftTypography variant="button" color="text" fontWeight="regular">
              Chưa có tài khoản?{" "}
              <SoftTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Đăng ký
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </form>
    </CoverLayout>
  );
}

export default SignIn;
