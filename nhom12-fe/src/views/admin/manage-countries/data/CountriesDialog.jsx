import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import { Autocomplete, Avatar, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { createContinents, updateContinents } from "../continents-service";

export default function ContinentsDialog(props) {
  let { open, item, handleClose, handleOk = () => {} } = props;
  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    let { name, value } = event.target;
    setState((pre) => ({ ...pre, [name]: value }));
  };

  const convertData = () => {
    return {
      id: state?.id,
      name: state?.name,
      countries: state?.countries,
    };
  };
  const handleFormSubmit = async () => {
    try {
      const payload = convertData();

      if (item?.id) {
        const data = await updateContinents(payload);
        console.log(data);
      } else {
        const data = await createContinents(payload);
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
    }));
  }, [item]);

  return (
    <React.Fragment>
      <Grid container>
        <Dialog
          fullWidth
          maxWidth={"sm"}
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
          <DialogTitle>Thêm mới/Cập nhật thông tin lục địa</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12}>
                <SoftBox>
                  <SoftBox ml={0.5}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Tên lục địa
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
ContinentsDialog.prototype = {
  open: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  handleOk: PropTypes.func.isRequired,
};
