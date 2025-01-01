import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import {
  formatPrice,
  formatTimestampToDate, getCurrentUser,
} from "../../../../const/app-function";
import Visibility from "@mui/icons-material/Visibility";
import { appConst } from "../../../../const/app-const";
import { CheckCircle } from "@mui/icons-material";

export default function MuiTable({
  data = [],
  handleEdit = () => {},
  handleDelete = () => {},
  handleView = () => {},
  handleConfirmBuy = () => {},
}) {
  const role = getCurrentUser()?.role;
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(null);

  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
  };
  return (
    <TableContainer component={Paper} sx={{ scale: "0.92" }}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow sx={{ background: "#17c1e8" }}>
            <TableCell sx={{ color: "#fff", width: "160px" }} align="center">
              Thao tác
            </TableCell>
            <TableCell sx={{ color: "#fff", width: "30px" }}>STT</TableCell>
            <TableCell sx={{ color: "#fff" }} align="center">
              Tên khách hàng
            </TableCell>
            <TableCell sx={{ color: "#fff" }} align="center">
              Số lượng khách hàng
            </TableCell>
            <TableCell sx={{ color: "#fff" }} align="center">
              Giá tiền trên mỗi người
            </TableCell>
            <TableCell sx={{ color: "#fff" }} align="center">
              Ngày bắt đầu
            </TableCell>
            <TableCell sx={{ color: "#fff" }} align="center">
              Trạng thái
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length <= 0 ? (
            <TableRow>
              <TableCell
                sx={{ textAlign: "center", height: "300px" }}
                colSpan={9}
                align=""
              >
                Không có bản ghi nào hiển thị
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow
                key={row.name}
                onClick={() => handleRowClick(index)}
                sx={{
                  "& td, & th": { border: "1px solid #f5f5f5" },
                  "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" }, // Hiệu ứng hover
                  backgroundColor:
                    selectedRowIndex === index ? "#e4f6fb" : "inherit",
                }}
              >
                {role === appConst.ROLE.SUPPER_ADMIN.name ?
                  <TableCell align="center">
                    <IconButton
                      aria-label="view"
                      size="small"
                      color="secondary"
                      onClick={() => handleView(row)}
                    >
                      <Visibility fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                  :
                  <TableCell align="center">
                    {![
                      appConst.STATUS_ORDER_BOOKING.SOLD.name,
                      appConst.STATUS_ORDER_BOOKING.CANCEL.name,
                      appConst.STATUS_ORDER_BOOKING.WAIT.name,
                    ].includes(row?.statusOrder) && (
                      <>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          color="info"
                          onClick={() => handleEdit(row)}
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          color="error"
                          onClick={() => handleDelete(row)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </>
                    )}
                    <IconButton
                      aria-label="view"
                      size="small"
                      color="secondary"
                      onClick={() => handleView(row)}
                    >
                      <Visibility fontSize="inherit" />
                    </IconButton>
                    {[appConst.STATUS_ORDER_BOOKING.WAIT.name].includes(
                      row?.statusOrder
                    ) && (
                      <IconButton
                        aria-label="view"
                        size="small"
                        color="success"
                        onClick={() => handleConfirmBuy(row)}
                      >
                        <CheckCircle fontSize="inherit" />
                      </IconButton>
                    )}
                  </TableCell>
                }
                <TableCell align="center">
                  <b>{index + 1}</b>
                </TableCell>
                <TableCell align="">{row.customerName}</TableCell>
                <TableCell align="">{row.numberOfPeople}</TableCell>
                <TableCell align="right">
                  {formatPrice(row.totalPrice)}
                </TableCell>
                <TableCell align="">
                  {formatTimestampToDate(row.startDate)}
                </TableCell>
                <TableCell align="">{row.statusOrder}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
