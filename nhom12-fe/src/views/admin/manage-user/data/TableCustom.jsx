import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";



const theme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        slotProps: {
          pagination: {
            labelRowsPerPage: "Số hàng mỗi trang:",
          },
          paginationModel: {
            pageSize: 10,
          },
        },
        localeText: {
          footerRowSelected: (count) => `${count} hàng được chọn`,
          footerTotalRows: (count) => `Tổng cộng: ${count} hàng`,
          footerDisplayedRows: ({ from, to, count }) => `${from}-${to} trong ${count}`,
        },
      },
    },
  },
});

export default function TableCustom({ data = [], columns = [] }) {

  return (
    <>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          hideFooterSelectedRowCount={true}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          sx={(theme) => {
            return {
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#17c1e8", // Màu nền header
                color: "white", // Màu chữ của tiêu đề cột
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold", // Làm đậm chữ tiêu đề
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: "hidden", // Ẩn đường phân cách giữa các cột
              },
            }
          }}
        />
      </ThemeProvider>
    </>
  );
}
