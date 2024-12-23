// Authentication layout components
import ClientLayout from "layouts/authentication/components/ClientLayout";
import {
  Card,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import ProjectCardDesc from "examples/Cards/ProjectCards/ProjectCardDesc";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import bannerImage from "assets/images/home-decor-3.jpg";
import SoftBox from "components/SoftBox";

function Destination() {
  return (
    <ClientLayout top={10}>
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
      {/* Suggested Destinations Section */}
      <SoftBox mb={5}>
        <Card sx={{ width: "100%" }}>
          <SoftBox p={2} sx={{ padding: "10px 200px" }}>
            <Typography variant="h1">Bangkok</Typography>
            <Typography variant="p" mb={2} paddingBottom={5}>
              Bangkok, còn được người dân địa phương gọi là Krung Thep, là một
              đô thị rộng lớn với những tòa nhà chọc trời và nhiều di tích lịch
              sử. Vùng đất c ủa Voi trắng sở hữu nhiều nét quyến rũ này đang chờ
              được khám phá bởi các gia đình, cặp đôi, hay cả k hách du lịch độc
              hành. Không có gì lạ khi Bangkok là một trong những điểm đến được
              yêu thích cho kỳ nghỉ cuố i tuần. Không chỉ là nơi tọa lạc của
              nhiều ngôi đền và tượng ...
            </Typography>
            <br></br>
            <Box
              sx={{ borderBottom: "1px dashed #CDD0D1", margin: "30px 0px" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Box>
                  <img
                    loading="lazy"
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2024/07/01/1719809679773-14c6c90e018ec70efcf04fd43a12744f.png?tr=q-40,c-at_max,w-1536,h-2048&_src=imagekit"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                    alt="lazyy"
                  />
                </Box>
                <Box>
                  <h2
                    dir="auto"
                    role="heading"
                    style={{
                      color: "rgb(0, 135, 90)",
                    }}
                  >
                    Tìm hiểu Bangkok
                  </h2>
                  <div>Tham quan các điểm nổi bật của điểm đến này</div>
                </Box>
              </Box>
            </Box>
            <Typography variant="h3" fontWeight={"bold"} mb={1}>
              Điểm tham quan du lịch Bangkok nổi tiếng
            </Typography>
            <Grid container spacing={4} mt={1}>
              <Grid item xs={12} md={6} xl={3}>
                <ProjectCardDesc image={homeDecor1} description="Don Mueang" />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <ProjectCardDesc image={homeDecor2} description="Lat Krabang" />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <ProjectCardDesc image={homeDecor3} description="Ratchathewi" />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <ProjectCardDesc image={homeDecor3} description="Huai Khwang" />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>
    </ClientLayout>
  );
}

export default Destination;
