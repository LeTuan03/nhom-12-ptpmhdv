import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import {
  Autocomplete,
  Grid,
  Icon,
  ListItemIcon,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { createCountries, updateCountries } from "../countries-service";
import { getAllContinents } from "../../manage-continents/continents-service";
import {
  collapseIcon,
  collapseIconBox,
} from "../../../../examples/Sidenav/styles/sidenavCollapse";
import { useSoftUIController } from "../../../../context";
import MuiTableDialog from "./MuiTableDialog";

export default function CountriesDialog(props) {
  const [controller] = useSoftUIController();
  const { transparentSidenav, sidenavColor } = controller;
  const { open, item, handleClose, handleOk = () => {} } = props;
  const [state, setState] = React.useState({
    optionsContinents: [],
    continents: null,
    name: "",
    cities: [],
  });

  // Fetch options for continents
  const getOptionsContinents = async () => {
    try {
      const data = await getAllContinents();
      setState((pre) => ({ ...pre, optionsContinents: data?.data || [] }));
    } catch (e) {
      console.error("Error fetching continents:", e);
    }
  };

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((pre) => ({ ...pre, [name]: value }));
  };

  // Handle option selection
  const handleChangeOption = (data, source) => {
    setState((pre) => ({ ...pre, [source]: data }));
  };

  // Prepare data to submit
  const convertData = () => {
    return {
      name: state?.name,
      continentsId: state?.continents?.id,
      continentsName: state?.continents?.name,
      cities: state?.cities?.map((item) => ({
        ...item,
        id: item?.id || null,
        countryId: item?.countryId || null,
      })),
    };
  };

  // Submit the form
  const handleFormSubmit = async () => {
    try {
      const payload = convertData();
      if (item?.id) {
        await updateCountries(payload, item?.id);
      } else {
        await createCountries(payload);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      handleClose();
      handleOk();
    }
  };
  const fetchData = async () => {
    try {
      setState((pre) => ({
        ...pre,
        ...item,
        continents: {
          id: item?.continentsId,
          name: item?.continentsName,
        },
      }));
      await getOptionsContinents();
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  };

  // Load options and initialize state
  React.useEffect(() => {
    fetchData();
  }, [item]);

  const handleDelete = (index) => {
    const updatedCities = [...state.cities]; // Tạo bản sao mảng
    updatedCities.splice(index, 1); // Xóa phần tử theo index
    setState((prevState) => ({
      ...prevState,
      cities: updatedCities,
    }));
  };

  const handleAdd = () => {
    setState((prevState) => ({
      ...prevState,
      cities: [...state.cities, { name: "" }],
    }));
  };

  const handleChangeCellTable = (event, index) => {
    const { value } = event.target;

    const updatedCities = state?.cities?.map((city, i) =>
      i === index ? { ...city, name: value } : city
    );

    setState((prevState) => ({
      ...prevState,
      cities: updatedCities,
    }));
  };

  return (
    <React.Fragment>
      <Grid container>
        <Dialog
          fullWidth
          maxWidth={"sm"}
          open={open}
          onClose={() => {
            if (typeof handleClose === "function") handleClose();
          }}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              handleFormSubmit();
            },
          }}
        >
          <DialogTitle>Thêm mới/Cập nhật danh mục địa chỉ</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12}>
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
                    options={
                      Array.isArray(state?.optionsContinents)
                        ? state?.optionsContinents
                        : []
                    }
                    fullWidth
                    value={state?.continents || null}
                    getOptionLabel={(option) => option?.name || ""}
                    onChange={(event, data) =>
                      handleChangeOption(data, "continents")
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </SoftBox>
              </Grid>
              <Grid item lg={6} md={6} sm={12}>
                <SoftBox>
                  <SoftBox ml={0.5}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Tên nước
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
              <Grid item lg={12} md={12} sm={12}>
                <SoftBox>
                  <ListItemIcon
                    onClick={() => handleAdd()}
                    sx={(theme) =>
                      collapseIconBox(theme, {
                        active: true,
                        transparentSidenav,
                        color: sidenavColor,
                      })
                    }
                    style={{ width: "fit-content" }}
                  >
                    <Icon sx={(theme) => collapseIcon(theme, { active: true })}>
                      add
                    </Icon>
                  </ListItemIcon>
                </SoftBox>
              </Grid>
              <Grid item lg={12} md={12} sm={12}>
                <MuiTableDialog
                  data={state?.cities}
                  handleDelete={handleDelete}
                  handleChange={handleChangeCellTable}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                if (typeof handleClose === "function") handleClose();
              }}
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

CountriesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  handleOk: PropTypes.func.isRequired,
};
