import { useState } from "react";

// Authentication layout components
import ClientLayout from "layouts/authentication/components/ClientLayout";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import backgroundImage from "assets/images/home-decor-3.jpg"; // Thêm ảnh nền bất kỳ
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Home() {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Searching for:", search);
    // Thêm logic tìm kiếm tại đây
  };

  return (
    <ClientLayout>
      {/* Phần header */}
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px", // Chiều cao phần nền
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff", // Màu chữ trắng
          textAlign: "center",
        }}
      >
        {/* Tiêu đề */}
        <Typography
             variant="h3"
                 sx={{
             fontWeight: "bold",
             mb: 4,
             textShadow: "2px 2px 5px rgba(62, 194, 170, 0.8)", // Hiệu ứng bóng chữ
            color: "#ffeb3b", // Màu chữ mới, ví dụ màu vàng
  }}
>
  Latest reviews. Lowest prices.
</Typography>

        {/* Thanh tìm kiếm */}
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "50px",
            display: "flex",
            alignItems: "center",
            padding: "10px 20px",
            gap: 2,
            boxShadow: "0px 4px 8px rgba(39, 35, 35, 0.2)", // Đổ bóng hộp tìm kiếm
            width: "80%",
            maxWidth: "900px",
          }}
        >
          <TextField
            fullWidth
            placeholder="Hotel name or destination"
            value={search}
            onChange={handleSearchChange}
            sx={{
              backgroundColor: "#f7f7f7",
              borderRadius: "25px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
              },
            }}
          />
          <TextField
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              backgroundColor: "#f7f7f7",
              borderRadius: "25px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
              },
            }}
          />
          <TextField
            type="number"
            placeholder="Guests"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              backgroundColor: "#f7f7f7",
              borderRadius: "25px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00c853",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "25px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#009624",
              },
            }}
            onClick={handleSearchSubmit}
          >
            Find hotels
          </Button>
        </Box>
      </Box>

      {/* Phần danh sách khách sạn */}
      {[...Array(3)].map((_, index) => (
        <Box sx={{ p: 5 }} key={index}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              Travelers' Choice: Top hotels
            </Typography>
            <Typography
              sx={{
                color: "#00c853",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              See all
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <DefaultProjectCard
                image={homeDecor1}
                label="Hotel 1"
                title="Luxury Hotel"
                description="Enjoy premium services and breathtaking views."
                action={{
                  type: "internal",
                  route: "/hotel-details/1",
                  color: "info",
                  label: "View hotel",
                }}
                authors={[
                  { image: team1, name: "John Doe" },
                  { image: team2, name: "Jane Smith" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <DefaultProjectCard
                image={homeDecor2}
                label="Hotel 2"
                title="Scenic Resort"
                description="A perfect getaway for nature lovers."
                action={{
                  type: "internal",
                  route: "/hotel-details/2",
                  color: "info",
                  label: "View hotel",
                }}
                authors={[
                  { image: team3, name: "Alice Johnson" },
                  { image: team4, name: "Bob Brown" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <DefaultProjectCard
                image={homeDecor3}
                label="Hotel 3"
                title="Urban Oasis"
                description="Experience modern living in the heart of the city."
                action={{
                  type: "internal",
                  route: "/hotel-details/3",
                  color: "info",
                  label: "View hotel",
                }}
                authors={[
                  { image: team2, name: "Jane Smith" },
                  { image: team4, name: "Bob Brown" },
                ]}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </ClientLayout>
  );
}

export default Home;
