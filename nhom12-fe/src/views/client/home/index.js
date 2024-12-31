import { useEffect, useState } from "react";

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
import backgroundImage from "assets/images/banner.jpg"; // Thêm ảnh nền bất kỳ
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import iconMain from "assets/images/apple-icon.png";
import SoftBox from "../../../components/SoftBox";
import { getAllContinents } from "../../admin/manage-continents/continents-service";
import { useNavigate } from "react-router-dom";
import { getAllRating } from "../reservation/reservation-service";
import { getRecommendForUser } from "../../../const/app-service";
import { getCurrentUser } from "../../../const/app-function";
import { getPlacesByIds } from "../../admin/manage-place/place-service";

function Home() {
  const navigate = useNavigate();
  const [state, setState] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSearchSubmit = () => {
    navigate(`/destination/${state?.country?.id}`);
  };

  const handleNavigate = (id) => {
    navigate(`/moment/${id}`);
  };
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setState((pre) => ({
      ...pre,
      listCountries: state?.listContinents?.length
        ? state?.listContinents[newValue]?.countries
        : [],
    }));
  };

  const getListOptions = async () => {
    try {
      const listContinents = await getAllContinents();
      const listRatings = await getAllRating();

      setState((pre) => ({
        ...pre,
        listContinents: listContinents?.data,
        listCountries: listContinents?.data?.[0]?.countries || [],
        listRatings: listRatings?.data,
      }));
    } catch (e) {}
  };

  const getListOptionsRcm = async () => {
    try {
      if (getCurrentUser()?.id) {
        const getIdRcm = await getRecommendForUser(getCurrentUser()?.id);
        let listId = getIdRcm?.data?.data?.map((rcm) => rcm.location);
        const listPlacesByIds = await getPlacesByIds(listId);
        setState((pre) => ({
          ...pre,
          listPlacesByIds: listPlacesByIds?.data,
        }));
      }
    } catch (e) {}
  };

  useEffect(() => {
    getListOptions();
    getListOptionsRcm();
  }, []);

  const handleChangeOption = (data, source) => {
    setState((pre) => ({ ...pre, [source]: data }));
  };
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
          Tìm cảm hứng du lịch theo cách của bạn!
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
            options={state?.listCountries?.length ? state?.listCountries : []}
            getOptionLabel={(option) => option.name}
            onChange={(event, data) => handleChangeOption(data, "country")}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                placeholder="Tìm kiếm địa điểm của bạn tại đây"
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
            Hướng dẫn du lịch từ A - Z
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ color: "rgb(143 143 143)", fontSize: "16px" }}
          >
            Cẩm nang du lịch cho chuyến đi hoàn hảo
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <SoftBox
            mb={3}
            mt={3}
            sx={{ backgroundColor: "rgb(255 255 255 / 80%)" }}
          >
            <Tabs value={selectedTab} onChange={handleTabChange}>
              {state?.listContinents?.map((item) => (
                <Tab key={item.id} sx={{ width: "200px" }} label={item?.name} />
              ))}
            </Tabs>
          </SoftBox>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          {state?.listCountries?.map((item) => (
            <Grid item xs={12} md={6} lg={4}>
              <DefaultProjectCard
                image={item?.image || homeDecor1}
                title={item?.name}
                action={{
                  type: "internal",
                  route: `/destination/${item?.id}`,
                  color: "info",
                  label: "Xem chi tiết",
                }}
                authors={[
                  { image: team1, name: "John Doe" },
                  { image: team2, name: "Jane Smith" },
                ]}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          p: 5,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "24px" }}>
            Cảm hứng du lịch
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ color: "rgb(143 143 143)", fontSize: "16px" }}
          >
            Hãy đọc bài viết sau để lên kế hoạch cho chuyến du lịch của mình
            nhé!
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={3} sx={{ mt: 3 }}>
          {state?.listRatings?.map((rate) => (
            <Grid
              key={rate?.id}
              item
              xs={12}
              md={6}
              lg={4}
              onClick={() => handleNavigate(rate?.id)}
            >
              <ProjectCardDesc
                image={rate?.image || homeDecor1}
                description={rate?.title}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      {state?.listPlacesByIds?.length && (
        <Grid
          container
          sx={{
            p: 5,
          }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ fontSize: "24px" }}
            >
              Gợi ý cho bạn
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              sx={{ color: "rgb(143 143 143)", fontSize: "16px" }}
            >
              Cùng tìm hiểu những gợi ý thú vị cho chuyến đi sắp tới.
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={3} sx={{ mt: 3 }}>
            {state?.listPlacesByIds?.map((place) => (
              <Grid
                key={place?.id}
                item
                xs={12}
                md={6}
                lg={4}
                onClick={() => navigate(`/detail-area/${place?.id}`)}
              >
                <ProjectCardDesc
                  image={place?.imageUrl || homeDecor1}
                  description={place?.name}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
      {/*Travel guide*/}
    </ClientLayout>
  );
}

export default Home;
