import ClientLayout from "layouts/authentication/components/ClientLayout";
import React from "react";
import ProfileUser from "./ProfileUser";

function UserProfile() {
  return (
    <ClientLayout top={10}>
      <ProfileUser />
    </ClientLayout>
  );
}

export default UserProfile;
