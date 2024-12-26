// Authentication layout components
import ClientLayout from "layouts/authentication/components/ClientLayout";
import {
  Card,
  Grid,
  Typography,
  Box,
  Breadcrumbs,
  Link,
} from "@mui/material";
import ProjectCardDesc from "examples/Cards/ProjectCards/ProjectCardDesc";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-3.jpg";
import SoftBox from "components/SoftBox";

function Area() {
  return (
    <ClientLayout top={10}>
      
      
      {/* Introduction Section */}
      <SoftBox mb={5}>
        <Card sx={{ width: "100%", p: 3 }}>
          <Typography variant="h1" fontWeight="bold" mb={3}>
            Don Mueang
          </Typography>
          {/* Breadcrumb Navigation */}
      <SoftBox mb={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="#">
            Asia
          </Link>
          <Link underline="hover" color="inherit" href="#">
            Thái Lan
          </Link>
          <Typography color="text.primary">Don Mueang</Typography>
        </Breadcrumbs>
      </SoftBox>
          <Typography variant="body1" mb={3}>
            Khám phá Don Mueang, Thái Lan thật dễ dàng với cẩm nang du lịch từ Traveloka. Tại đây bạn có thể tìm kiếm mọi thông tin từ phương tiện di chuyển, ăn gì, ở đâu cho tới các trải nghiệm thú vị chỉ trong tích tắc. Lên kế hoạch khám phá Don Mueang ngay!
          </Typography>
        </Card>
      </SoftBox>
      
      {/* Suggested Areas Section */}
      <SoftBox mb={5}>
        <Card sx={{ width: "100%", p: 3 }}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Chỗ ở hàng đầu tại Don Mueang
          </Typography>
          <Typography variant="body1" mb={3}>
            Đã được thử nghiệm và đúng giá cho một kỳ nghỉ đáng nhớ
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <ProjectCardDesc image={homeDecor1} description="The Royal Bee Aparthotel Don Mueang International" discount="27%" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <ProjectCardDesc image={homeDecor2} description="Hoppers Place Donmueang Hostel" discount="2%" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <ProjectCardDesc image={homeDecor3} description="The Riche Boutique Hotel Don Mueang Airport" discount="53%" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <ProjectCardDesc image={homeDecor4} description="Sleepcase Hostel" discount="25%" />
            </Grid>
          </Grid>
        </Card>
      </SoftBox>

      {/* Restaurant and Hotels Section */}
      <SoftBox mb={5}>
        <Card sx={{ width: "100%", p: 3 }}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Nhà hàng và Khách sạn
          </Typography>
          <Typography variant="body1" mb={3}>
            Trải nghiệm ẩm thực và dịch vụ lưu trú tuyệt vời
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <ProjectCardDesc image={homeDecor1} description="Nhà hàng Hải Sản Biển Đông" discount="10%" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <ProjectCardDesc image={homeDecor2} description="Khách sạn Hoàng Gia" discount="15%" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <ProjectCardDesc image={homeDecor3} description="Nhà hàng 5 Sao Gourmet" discount="20%" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <ProjectCardDesc image={homeDecor4} description="Resort nghỉ dưỡng sang trọng" discount="30%" />
            </Grid>
          </Grid>
        </Card>
      </SoftBox>

     
    </ClientLayout>
  );
}

export default Area;
