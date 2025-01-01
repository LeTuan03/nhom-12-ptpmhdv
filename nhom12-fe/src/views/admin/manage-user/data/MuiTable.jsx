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
import Visibility from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import SoftBadge from "components/SoftBadge";
import { appConst } from "../../../../const/app-const";

export default function MuiTable({
  data = [],
  handleEdit = () => {},
  handleDelete = () => {},
  handleView = () => {},
}) {
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(null);

  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
  };
  return (
    <TableContainer component={Paper} sx={{ scale: "0.92" }}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow sx={{ background: "#17c1e8" }}>
            <TableCell sx={{ color: "#fff", width: "120px" }}>
              Thao tác
            </TableCell>
            <TableCell sx={{ color: "#fff", width: "30px" }}>STT</TableCell>
            <TableCell sx={{ color: "#fff" }} align="center">
              Tên đăng nhập
            </TableCell>
            <TableCell sx={{ color: "#fff" }} align="center">
              Họ và tên
            </TableCell>
            <TableCell sx={{ color: "#fff" }} align="center">
              Email
            </TableCell>
            <TableCell sx={{ color: "#fff" }} align="center">
              Vai trò
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
                <TableCell>
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
                  <IconButton
                    aria-label="view"
                    size="small"
                    color="secondary"
                    onClick={() => handleView(row)}
                  >
                    <Visibility fontSize="inherit" />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <b>{index + 1}</b>
                </TableCell>
                <TableCell align="">{row.username}</TableCell>
                <TableCell align="">{row.name}</TableCell>
                <TableCell align="">{row.email}</TableCell>
                <TableCell align="center">
                  {row.role === appConst.ROLE.ADMIN.name ? (
                    <SoftBadge
                      variant="gradient"
                      badgeContent={appConst.ROLE.ADMIN.name}
                      color="success"
                      size="xs"
                      container
                    />
                  ) : row.role === appConst.ROLE.SUPPER_ADMIN.name ? (
                    <SoftBadge
                      variant="gradient"
                      badgeContent={appConst.ROLE.SUPPER_ADMIN.name}
                      color="info"
                      size="xs"
                      container
                    />
                  ) : (
                    <SoftBadge
                      variant="gradient"
                      badgeContent="USER"
                      color="secondary"
                      size="xs"
                      container
                    />
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
