

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
import { useState } from "react";
import UserDialog from "./data/UserDialog";
import SoftConfirmDialog from "components/SoftConfirmDialog";
import SoftInput from "components/SoftInput";
import SearchIcon from '@mui/icons-material/Search';

function ManageUser() {
  const [controller] = useSoftUIController();
  const { miniSidenav, transparentSidenav, sidenavColor } = controller;
  const [openEdit, setOpenEdit] = useState(false);
  const [state, setState] = useState({ item: {} });

  const handleSetState = (source, data) => {
    setState((pre) => ({ ...pre, [source]: data }))
  }

  const handleOpenDialog = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
    handleSetState("item", {})
    handleSetState("openConfirm", false)
  };

  const handleSearch = async () => {
    try {

    } catch (error) {

    }
  }

  const data = [
    {
      id: 1,
      name: "John",
      age: 25
    },
    {
      id: 1,
      name: "John",
      age: 25
    },
  ];

  const handleEdit = (item) => {
    handleSetState("item", item)
    console.log(item);
    handleOpenDialog()

  }

  const handleDelete = (item) => {
    handleSetState("item", item)
    handleSetState("openConfirm", true)
    console.log(item);
  }

  const handleYesDelete = async () => {
    try {

    } catch (error) {

    } finally {
      handleClose();
      handleSearch();
    }
  }
  return (
    <DashboardLayout>
      <DashboardNavbar title='Quản lý tài khoản' subTitle="Danh sách người dùng" />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftBox sx={(theme) => collapseItem(theme, { active: true, transparentSidenav })}>
                <ListItemIcon
                  onClick={handleOpenDialog}
                  sx={(theme) => collapseIconBox(theme, { active: true, transparentSidenav, color: sidenavColor })}
                >
                  <Icon sx={(theme) => collapseIcon(theme, { active: true })}>add</Icon>
                </ListItemIcon>

                <ListItemText
                  primary={"Thêm mới"}
                  sx={(theme) => collapseText(theme, { miniSidenav, transparentSidenav, active: true })}
                />
                <SoftBox sx={{
                  display: "flex",
                  position: "relative",
                }}>
                  <SoftInput placeholder={"Tìm kiếm ..."} size="small" icon={{
                    component: (
                      <IconButton sx={{ position: "absolute", top: "2px", right: "2px" }} size="small" color='info' >
                        <SearchIcon />
                      </IconButton>
                    ),
                    direction: "right"
                  }} />
                </SoftBox>
              </SoftBox>
            </SoftBox>
            <SoftBox>
              <MuiTable data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
              {openEdit && <UserDialog open={openEdit} handleClose={handleClose} handleOk={handleSearch} item={state?.item} />}
              {state?.openConfirm && <SoftConfirmDialog open={state?.openConfirm} handleClose={handleClose} handleOk={handleYesDelete} />}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default ManageUser;
