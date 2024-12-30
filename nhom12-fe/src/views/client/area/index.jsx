// Authentication layout components
import ClientLayout from "layouts/authentication/components/ClientLayout";
import { Card, Grid, Typography, Box, Breadcrumbs, Link } from "@mui/material";
import ProjectCardDesc from "examples/Cards/ProjectCards/ProjectCardDesc";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import SoftBox from "components/SoftBox";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getDestinationById,
} from "../../admin/manage-destination/destination-service";

function Area() {
  const params = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({});
  const handleSearch = async () => {
    if (!params?.id) return;
    try {
      const payload = {
        destinationId: params?.id,
      };
      // const data = await searchDestination(payload);
      const destination = await getDestinationById(params?.id);
      setState({ listItems: [], destination: destination?.data });
    } catch (error) {}
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleNavigate = (id) => {
    navigate("/detail-area/" + id);
  };
  return (
    <ClientLayout top={10}>
      {/* Introduction Section */}
      <SoftBox mb={5}>
        <Card sx={{ width: "100%", p: 3 }}>
          <Typography variant="h1" fontWeight="bold" mb={3}>
            {state?.destination?.name}
          </Typography>
          {/* Breadcrumb Navigation */}
          <SoftBox mb={2}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="#">
                {state?.destination?.continent?.name}
              </Link>
              <Link underline="hover" color="inherit" href="#">
                {state?.destination?.country?.name}
              </Link>
              <Typography color="text.primary">
                {state?.destination?.name}
              </Typography>
            </Breadcrumbs>
          </SoftBox>
          <Typography variant="body1" mb={3}>
            {state?.destination?.description}
          </Typography>
        </Card>
      </SoftBox>

      {/* Suggested Areas Section */}
      {/*<SoftBox mb={5}>*/}
      {/*  <Card sx={{ width: "100%", p: 3 }}>*/}
      {/*    <Typography variant="h4" fontWeight="bold" mb={2}>*/}
      {/*      Chỗ ở hàng đầu tại Don Mueang*/}
      {/*    </Typography>*/}
      {/*    <Typography variant="body1" mb={3}>*/}
      {/*      Đã được thử nghiệm và đúng giá cho một kỳ nghỉ đáng nhớ*/}
      {/*    </Typography>*/}
      {/*    <Grid container spacing={2}>*/}
      {/*      <Grid item xs={12} md={6} lg={3}>*/}
      {/*        <ProjectCardDesc*/}
      {/*          image={homeDecor1}*/}
      {/*          description="The Royal Bee Aparthotel Don Mueang International"*/}
      {/*          discount="27%"*/}
      {/*        />*/}
      {/*      </Grid>*/}
      {/*      <Grid item xs={12} md={6} lg={3}>*/}
      {/*        <ProjectCardDesc*/}
      {/*          image={homeDecor2}*/}
      {/*          description="Hoppers Place Donmueang Hostel"*/}
      {/*          discount="2%"*/}
      {/*        />*/}
      {/*      </Grid>*/}
      {/*      <Grid item xs={12} md={6} lg={3}>*/}
      {/*        <ProjectCardDesc*/}
      {/*          image={homeDecor3}*/}
      {/*          description="The Riche Boutique Hotel Don Mueang Airport"*/}
      {/*          discount="53%"*/}
      {/*        />*/}
      {/*      </Grid>*/}
      {/*      <Grid item xs={12} md={6} lg={3}>*/}
      {/*        <ProjectCardDesc*/}
      {/*          image={homeDecor4}*/}
      {/*          description="Sleepcase Hostel"*/}
      {/*          discount="25%"*/}
      {/*        />*/}
      {/*      </Grid>*/}
      {/*    </Grid>*/}
      {/*  </Card>*/}
      {/*</SoftBox>*/}

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
            {state?.destination?.places?.map((place) => (
              <Grid
                key={place?.id}
                item
                xs={12}
                md={6}
                lg={3}
                onClick={() => handleNavigate(place?.id)}
              >
                <ProjectCardDesc
                  image={place?.imageUrl}
                  description={place?.name}
                  discount="10%"
                />
              </Grid>
            ))}
          </Grid>
        </Card>
      </SoftBox>
    </ClientLayout>
  );
}

export default Area;
