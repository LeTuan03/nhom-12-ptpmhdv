// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import { collapseItem } from "examples/Sidenav/styles/sidenavCollapse";
import { Icon, IconButton, ListItemIcon, ListItemText } from "@mui/material";
import { collapseText } from "examples/Sidenav/styles/sidenavCollapse";
import { useSoftUIController } from "context";
import { collapseIconBox } from "examples/Sidenav/styles/sidenavCollapse";
import { collapseIcon } from "examples/Sidenav/styles/sidenavCollapse";
import MuiTable from "./data/MuiTable";
import { useEffect, useState } from "react";
import BookingDialog from "./data/BookingDialog";
import SoftConfirmDialog from "components/SoftConfirmDialog";
import SoftInput from "components/SoftInput";
import SearchIcon from "@mui/icons-material/Search";
import {
  deleteBooking,
  getAllBooking,
  updateStatusBooking,
} from "./booking-service";
import { appConst } from "const/app-const";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmBooking from "./data/ConfirmBooking";
import { getCurrentUser } from "../../../const/app-function";

function ManageBooking() {
  const role = getCurrentUser()?.role;
  const [controller] = useSoftUIController();
  const { miniSidenav, transparentSidenav, sidenavColor } = controller;
  const [openEdit, setOpenEdit] = useState(false);
  const [state, setState] = useState({ item: {} });

  const handleSetState = (source, data) => {
    setState((pre) => ({ ...pre, [source]: data }));
  };

  const handleOpenDialog = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
    handleSetState("item", {});
    handleSetState("openConfirm", false);
    handleSetState("openConfirmBuy", false);
  };

  const handleSearch = async () => {
    try {
      const data = await getAllBooking();
      if (data?.status === appConst.CODE.SUCCEED) {
        handleSetState("listItems", data?.data);
      }
    } catch (error) {}
  };

  const handleEdit = (item) => {
    handleSetState("item", item);
    console.log(item);
    handleOpenDialog();
  };

  const handleView = (item) => {
    handleSetState("item", { ...item, isView: true });
    console.log(item);
    handleOpenDialog();
  };

  const handleDelete = (item) => {
    handleSetState("item", item);
    handleSetState("openConfirm", true);
    console.log(item);
  };

  const handleConfirmBuy = (item) => {
    handleSetState("item", item);
    handleSetState("openConfirmBuy", true);
    console.log(item);
  };

  const handleYesDelete = async () => {
    try {
      const data = await deleteBooking(state.item?.id);
      toast.success("Xóa thành công");
    } catch (error) {
    } finally {
      handleClose();
      handleSearch();
    }
  };

  const handleYesConfirmBuy = async () => {
    try {
      const payload = {
        bookingId: state?.item?.id,
        statusOrder: appConst.STATUS_ORDER_BOOKING.SOLD.name,
      };
      const data = await updateStatusBooking(payload);
      toast.success("Xác nhận thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại");
    } finally {
      handleClose();
      handleSearch();
    }
  };

  const handleCancel = async () => {
    try {
      const payload = {
        bookingId: state?.item?.id,
        statusOrder: appConst.STATUS_ORDER_BOOKING.CANCEL.name,
      };
      const data = await updateStatusBooking(payload);
      toast.success("Hủy đặt chỗ thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại");
    } finally {
      handleClose();
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar title="Quản lý đặt chỗ" subTitle="Danh sách đặt chỗ" />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SoftBox
                sx={(theme) =>
                  collapseItem(theme, { active: true, transparentSidenav })
                }
              >
                <ListItemIcon
                  onClick={handleOpenDialog}
                  sx={(theme) =>
                    collapseIconBox(theme, {
                      active: true,
                      transparentSidenav,
                      color: sidenavColor,
                    })
                  }
                  style={{
                    ...(role === appConst.ROLE.SUPPER_ADMIN.name
                      ? {
                          display: "none",
                        }
                      : {}),
                  }}
                >
                  <Icon sx={(theme) => collapseIcon(theme, { active: true })}>
                    add
                  </Icon>
                </ListItemIcon>

                <ListItemText
                  primary={"Thêm mới"}
                  sx={(theme) =>
                    collapseText(theme, {
                      miniSidenav,
                      transparentSidenav,
                      active: true,
                    })
                  }
                  style={{
                    ...(role === appConst.ROLE.SUPPER_ADMIN.name
                      ? {
                          display: "none",
                        }
                      : {}),
                  }}
                />
                <SoftBox
                  sx={{
                    display: "flex",
                    position: "relative",
                  }}
                >
                  <SoftInput
                    placeholder={"Tìm kiếm ..."}
                    size="small"
                    icon={{
                      component: (
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                          }}
                          size="small"
                          color="info"
                        >
                          <SearchIcon />
                        </IconButton>
                      ),
                      direction: "right",
                    }}
                  />
                </SoftBox>
              </SoftBox>
            </SoftBox>
            <SoftBox>
              <MuiTable
                data={state?.listItems}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleView={handleView}
                handleConfirmBuy={handleConfirmBuy}
              />
              {openEdit && (
                <BookingDialog
                  open={openEdit}
                  handleClose={handleClose}
                  handleOk={handleSearch}
                  item={state?.item}
                />
              )}
              {state?.openConfirm && (
                <SoftConfirmDialog
                  open={state?.openConfirm}
                  handleClose={handleClose}
                  handleOk={handleYesDelete}
                />
              )}
              {state?.openConfirmBuy && (
                <ConfirmBooking
                  open={state?.openConfirmBuy}
                  handleClose={handleClose}
                  handleOk={handleYesConfirmBuy}
                  handleCancel={handleCancel}
                />
              )}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>

      <Footer />
      <ToastContainer autoClose={3000} />
    </DashboardLayout>
  );
}

export default ManageBooking;
