// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BlankLayout from "layouts/authentication/components/BlankLayout";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import { Link } from "react-router-dom";

function NotFound() {


  return (
    <BlankLayout
      title="404"
      description="Oops looks like the page is lost."
      image={curved6}
    >
     <SoftBox mt={4} mb={1}>
        <SoftButton variant="gradient" color="dark" fullWidth>
          <Link to={"/"}>Back to home</Link>
        </SoftButton>
      </SoftBox>
    </BlankLayout>
  );
}

export default NotFound;
