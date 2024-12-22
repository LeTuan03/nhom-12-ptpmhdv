import { useState } from "react";

// Authentication layout components
import ClientLayout from "layouts/authentication/components/ClientLayout";
import { Card, Grid, Typography, MenuItem, Select, FormControl, InputLabel, Box, Tabs, Tab } from "@mui/material";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import bannerImage from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import SoftBox from "components/SoftBox";

function Destination() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [travelType, setTravelType] = useState("");

  const handleTabChange = (event, newValue) => setSelectedTab(newValue);
  const handleCountryChange = (event) => setCountry(event.target.value);
  const handleCityChange = (event) => setCity(event.target.value);
  const handleTravelTypeChange = (event) => setTravelType(event.target.value);

  return (
    <ClientLayout>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          animation: "slide 15s infinite",
          color: "white",
          textAlign: "center",
          "@keyframes slide": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          Discover Your Next Adventure
        </Typography>
        <Typography variant="h6" mt={2}>
          Explore the best destinations tailored just for you.
        </Typography>
      </Box>

      {/* Tabs for Continents */}
      <SoftBox mb={3} mt={3}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Asia" />
          <Tab label="Europe" />
          <Tab label="North America" />
          <Tab label="South America" />
          <Tab label="Africa" />
          <Tab label="Australia" />
        </Tabs>
      </SoftBox>

      {/* Filters Section */}
      <SoftBox mb={3}>
        <Card sx={{ width: "100%", padding: "16px" }}>
          <Typography variant="h5" mb={2} textAlign="center" paddingBottom={5}>
            Filter Destinations
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="country-select-label">Country</InputLabel>
                <Select
                  labelId="country-select-label"
                  value={country}
                  onChange={handleCountryChange}
                >
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="France">France</MenuItem>
                  <MenuItem value="Japan">Japan</MenuItem>
                  <MenuItem value="Brazil">Brazil</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="city-select-label">City</InputLabel>
                <Select
                  labelId="city-select-label"
                  value={city}
                  onChange={handleCityChange}
                >
                  <MenuItem value="New York">New York</MenuItem>
                  <MenuItem value="Paris">Paris</MenuItem>
                  <MenuItem value="Tokyo">Tokyo</MenuItem>
                  <MenuItem value="Rio de Janeiro">Rio de Janeiro</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="travel-type-select-label">Travel Type</InputLabel>
                <Select
                  labelId="travel-type-select-label"
                  value={travelType}
                  onChange={handleTravelTypeChange}
                >
                  <MenuItem value="Adventure">Adventure</MenuItem>
                  <MenuItem value="Relaxation">Relaxation</MenuItem>
                  <MenuItem value="Cultural">Cultural</MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      </SoftBox>

      {/* Suggested Destinations Section */}
      <SoftBox mb={5}>
        <Card sx={{ width: "100%" }}>
          <SoftBox p={2}>
            <Typography variant="h5" mb={2} textAlign="center" paddingBottom={5}>
              Suggested Destinations
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor1}
                  label="Restaurant"
                  title="Modern Cuisine"
                  description="Enjoy exquisite dishes crafted by top chefs."
                  action={{
                    type: "internal",
                    route: "/pages/location/restaurant",
                    color: "info",
                    label: "view details",
                  }}
                  authors={[
                    { image: team1, name: "John Doe" },
                    { image: team2, name: "Jane Smith" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor2}
                  label="Hotel"
                  title="Luxury Stay"
                  description="Experience ultimate comfort and relaxation."
                  action={{
                    type: "internal",
                    route: "/pages/location/hotel",
                    color: "info",
                    label: "view details",
                  }}
                  authors={[
                    { image: team3, name: "Alice Brown" },
                    { image: team4, name: "Bob Green" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor3}
                  label="Attraction"
                  title="Iconic Landmarks"
                  description="Discover world-famous attractions."
                  action={{
                    type: "internal",
                    route: "/pages/location/landmark",
                    color: "info",
                    label: "view details",
                  }}
                  authors={[
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor3}
                  label="Adventure"
                  title="Outdoor Adventures"
                  description="Thrilling experiences await."
                  action={{
                    type: "internal",
                    route: "/pages/location/adventure",
                    color: "info",
                    label: "view details",
                  }}
                  authors={[
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                  ]}
                />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>

      {/* Footer Section */}
      <SoftBox mt={5} textAlign="center">
        <Typography variant="caption">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </SoftBox>
    </ClientLayout>
  );
}

export default Destination;
