import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
const message = `
  Đặt chỗ đã được thực hiện thành công. 
  Vui lòng xác nhận trạng thái đặt chỗ:
  - Xác nhận: Đơn hàng sẽ được đánh dấu là đã thanh toán.
  - Hủy: Đơn hàng sẽ bị hủy.

  Hãy chọn một trong hai phương án để tiếp tục xử lý đơn hàng này.
`;
export default function ConfirmBooking(props) {
  let { open, handleClose, title, handleOk = () => {}, handleCancel = () => {} } = props;
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
            },
          }}
        >
          <DialogTitle>Xác nhận</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12}>
                <SoftBox>
                  <SoftBox ml={0.5}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"

                      style={{ whiteSpace: "pre-line" }}
                    >
                      {message}
                    </SoftTypography>
                  </SoftBox>
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
              onClick={handleCancel}
              size="small"
              variant="contained"
              color="secondary"
              sx={{ color: "#fff" }}
            >
              Hủy thanh toán
            </Button>
            <Button
              onClick={handleOk}
              size="small"
              variant="contained"
              color="primary"
              sx={{ color: "#fff" }}
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </React.Fragment>
  );
}
ConfirmBooking.prototype = {
  open: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  handleOk: PropTypes.func.isRequired,
};
