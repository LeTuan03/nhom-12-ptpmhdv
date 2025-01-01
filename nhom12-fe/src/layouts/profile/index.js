// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

// Overview page components
import ProfileUser from "views/client/profile/ProfileUser";

function Overview() {
  return (
    <DashboardLayout>
      <SoftBox mt={5} mb={3}>
        <ProfileUser />
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
