import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

export default function SoftConfirmDialog(props) {
    let {
        open,
        handleClose,
        handleOk = () => { },
    } = props;
    return (
        <React.Fragment>
            <Grid container>
                <Dialog
                    fullWidth
                    maxWidth={"sm"}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
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
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Bạn có chắc chắc muốn xóa bản ghi này?
                                        </SoftTypography>
                                    </SoftBox>
                                </SoftBox>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} size='small' variant='contained' color='secondary' sx={{ color: "#fff" }}>Hủy</Button>
                        <Button onClick={handleOk} size='small' variant='contained' color='primary' sx={{ color: "#fff" }}>Xác nhận</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </React.Fragment>
    );
}
SoftConfirmDialog.prototype = {
    open: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    item: PropTypes.object,
    handleOk: PropTypes.func.isRequired,
};