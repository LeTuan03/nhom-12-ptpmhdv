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
import CountriesDialog from "./data/CountriesDialog";
import SoftConfirmDialog from "components/SoftConfirmDialog";
import SoftInput from "components/SoftInput";
import SearchIcon from "@mui/icons-material/Search";
import {
  deleteCountries,
  getAllCountries,
  searchCountries,
} from "./countries-service";
import { appConst } from "const/app-const";
import { toast } from "react-toastify";

function ManageCountries() {
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
  };

  const handleSearch = async () => {
    try {
      let payload = {
        name: state?.keyword,
      };
      const data = await searchCountries(payload);
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

  const handleYesDelete = async () => {
    try {
      const data = await deleteCountries(state.item?.id);
      toast.success("Xóa thành công");
    } catch (error) {
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
      <DashboardNavbar title="Quản lý địa chỉ" subTitle="Danh sách địa chỉ" />
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
                    onChange={(event) =>
                      setState((pre) => ({
                        ...pre,
                        keyword: event.target.value?.trim(),
                      }))
                    }
                    onKeyUp={(event) => {
                      if (!state?.keyword) {
                        handleSearch();
                      }
                    }}
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
                          onClick={() => handleSearch()}
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
              />
              {openEdit && (
                <CountriesDialog
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
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default ManageCountries;
