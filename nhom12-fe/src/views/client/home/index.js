import { useState } from "react";

// Authentication layout components
import ClientLayout from "layouts/authentication/components/ClientLayout";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Autocomplete,
  Tabs,
  Tab,
} from "@mui/material";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import ProjectCardDesc from "examples/Cards/ProjectCards/ProjectCardDesc";
import SearchIcon from "@mui/icons-material/Search";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import backgroundImage from "assets/images/banner.jpg"; // Thêm ảnh nền bất kỳ
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import iconMain from "assets/images/apple-icon.png";
import SoftBox from "../../../components/SoftBox";

function Home() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [search, setSearch] = useState("");

  const handleSearchSubmit = () => {
    console.log("Searching for:", search);
    // Thêm logic tìm kiếm tại đây
  };

  const handleTabChange = (event, newValue) => setSelectedTab(newValue);
  return (
    <ClientLayout top={10}>
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
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <img src={iconMain} alt={"iconMain"} />
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "#ffffff" }}
          >
            Travel Lite
          </Typography>
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 4,
            color: "#ffffff",
          }}
        >
          Find travel inspirations, your way!
        </Typography>

        {/* Thanh tìm kiếm */}
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "0.7rem",
            display: "flex",
            alignItems: "center",
            padding: "10px",
            gap: 2,
            boxShadow: "0px 4px 8px rgba(39, 35, 35, 0.2)", // Đổ bóng hộp tìm kiếm
            width: "80%",
            maxWidth: "900px",
          }}
        >
          <Autocomplete
            disablePortal
            fullWidth
            options={[
              { label: "The Shaw shank Redemption", year: 1994 },
              { label: "The Godfather", year: 1972 },
              { label: "The Godfather: Part II", year: 1974 },
              { label: "The Dark Knight", year: 2008 },
              { label: "12 Angry Men", year: 1957 },
              { label: "Schindler's List", year: 1993 },
              { label: "Pulp Fiction", year: 1994 },
            ]}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                placeholder="Hotel name or destination"
              />
            )}
          />
          <Button variant="contained" onClick={handleSearchSubmit}>
            <SearchIcon style={{ scale: "1.5", color: "white" }} />
          </Button>
        </Box>
      </Box>
      {/*Travel guide*/}
      <Grid
        container
        sx={{
          p: 5,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "24px" }}>
            Travel guide from A - Z
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ color: "rgb(143 143 143)", fontSize: "16px" }}
          >
            Travel guide for the perfect trip
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SoftBox
            mb={3}
            mt={3}
            sx={{ backgroundColor: "rgb(255 255 255 / 80%)" }}
          >
            <Tabs value={selectedTab} onChange={handleTabChange}>
              <Tab sx={{ width: "200px" }} label="Asia" />
              <Tab sx={{ width: "200px" }} label="Europe" />
              <Tab sx={{ width: "200px" }} label="North America" />
              <Tab sx={{ width: "200px" }} label="South America" />
              <Tab sx={{ width: "200px" }} label="Africa" />
              <Tab sx={{ width: "200px" }} label="Australia" />
            </Tabs>
          </SoftBox>
        </Grid>
        <Grid container item xs={12} spacing={3}>
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
                label: "View",
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
                label: "View",
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
                label: "View",
              }}
              authors={[
                { image: team2, name: "Jane Smith" },
                { image: team4, name: "Bob Brown" },
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
      {/*Travel guide*/}
      {/*Travel guide*/}
      <Grid
        container
        sx={{
          p: 5,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "24px" }}>
            Popular destinations
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ color: "rgb(143 143 143)", fontSize: "16px" }}
          >
            Prepare your luggage and explore these destinations now!
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SoftBox
            mb={3}
            mt={3}
            sx={{ backgroundColor: "rgb(255 255 255 / 80%)" }}
          >
            <Tabs value={selectedTab} onChange={handleTabChange}>
              <Tab sx={{ width: "200px" }} label="Popular destination" />
              <Tab sx={{ width: "200px" }} label="Cultural experience" />
              <Tab sx={{ width: "200px" }} label="Culinary tourism" />
            </Tabs>
          </SoftBox>
        </Grid>
        <Grid container item xs={12} spacing={3}>
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
                label: "View",
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
                label: "View",
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
                label: "View",
              }}
              authors={[
                { image: team2, name: "Jane Smith" },
                { image: team4, name: "Bob Brown" },
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
      {/*Travel guide*/}
      {/*Travel guide*/}
      <Grid
        container
        sx={{
          p: 5,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "24px" }}>
            Travel inspiration
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ color: "rgb(143 143 143)", fontSize: "16px" }}
          >
            Read the following articles to plan your travel!
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={3} sx={{mt: 3}}>
          <Grid item xs={12} md={6} lg={4}>
            <ProjectCardDesc
              image={homeDecor1}
              description="Enjoy premium services and breathtaking views."
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ProjectCardDesc
              image={homeDecor2}
              description="A perfect getaway for nature lovers."
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ProjectCardDesc
              image={homeDecor3}
              description="Experience modern living in the heart of the city."
            />
          </Grid>
        </Grid>
      </Grid>
      {/*Travel guide*/}
    </ClientLayout>
  );
}

export default Home;
