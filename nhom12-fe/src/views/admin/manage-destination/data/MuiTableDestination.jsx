import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

export default function MuiTableDestination({
  data = [],
  handleDelete = () => {},
  isView = false
}) {
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(null);

  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow sx={{ background: "#17c1e8" }}>
            <TableCell sx={{ color: "#fff", width: "100px" }}>
              Thao tác
            </TableCell>
            <TableCell sx={{ color: "#fff", width: "30px" }}>STT</TableCell>
            <TableCell sx={{ color: "#fff" }} align="center">
              Tên loại hình du lịch
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
                    color="error"
                    disabled={isView}
                    onClick={() => handleDelete(row)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <b>{index + 1}</b>
                </TableCell>
                <TableCell align="">{row.name}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
