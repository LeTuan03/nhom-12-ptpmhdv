// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { formatNumber, getCurrentUser } from "../../const/app-function";
import { appConst } from "../../const/app-const";
import {
  getMonthlyStatistics,
  getNewCustomer,
  getTotal,
} from "./dashboard-service";
import { useEffect, useState } from "react";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [state, setState] = useState({});

  const handleSearch = async () => {
    try {
      const payload = {
        ownerId:
          getCurrentUser()?.role !== appConst.ROLE.SUPPER_ADMIN.name
            ? getCurrentUser()?.id
            : null,
        placeId: null,
      };
      const payloadDiagram = {
        ownerId:
          getCurrentUser()?.role !== appConst.ROLE.SUPPER_ADMIN.name
            ? getCurrentUser()?.id
            : null,
        year: new Date().getFullYear(),
      };
      const data = await getTotal(payload);
      const newCustomer = await getNewCustomer();
      const monthlyStatistics = await getMonthlyStatistics(payloadDiagram);
      setState((pre) => ({
        ...pre,
        ...data?.data,
        ...newCustomer?.data,
        charData: monthlyStatistics?.data,
      }));
    } catch (error) {}
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Doanh thu ngày" }}
                count={`$${formatNumber(state?.dailyRevenue) || 0}`}
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Doanh thu tháng" }}
                count={`$${formatNumber(state?.monthlyRevenue) || 0}`}
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Doanh thu năm" }}
                count={`$${formatNumber(state?.yearlyRevenue) || 0}`}
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Khách hàng mới" }}
                count={`${state?.today || 0}`}
                percentage={{ color: "success", text: "" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        {/*<SoftBox mb={3}>*/}
        {/*  <Grid container spacing={3}>*/}
        {/*    <Grid item xs={12} lg={7}>*/}
        {/*      <BuildByDevelopers />*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={12} lg={5}>*/}
        {/*      <WorkWithTheRockets />*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*</SoftBox>*/}
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {/*<Grid item xs={12} lg={5}>*/}
            {/*  <ReportsBarChart*/}
            {/*    title="active users"*/}
            {/*    description={*/}
            {/*      <>*/}
            {/*        (<strong>+23%</strong>) than last week*/}
            {/*      </>*/}
            {/*    }*/}
            {/*    chart={chart}*/}
            {/*    items={items}*/}
            {/*  />*/}
            {/*</Grid>*/}
            <Grid item xs={12} lg={12}>
              <GradientLineChart
                title="Sơ đồ tổng quan"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox
                      fontSize={size.lg}
                      color="success"
                      mb={0.3}
                      mr={0.5}
                      lineHeight={0}
                    >
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography
                      variant="button"
                      color="text"
                      fontWeight="medium"
                    >
                      4% more{" "}
                      <SoftTypography
                        variant="button"
                        color="text"
                        fontWeight="regular"
                      >
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={state?.charData || gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        {/*<Grid container spacing={3}>*/}
        {/*  <Grid item xs={12} md={6} lg={8}>*/}
        {/*    <Projects />*/}
        {/*  </Grid>*/}
        {/*  <Grid item xs={12} md={6} lg={4}>*/}
        {/*    <OrderOverview />*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
