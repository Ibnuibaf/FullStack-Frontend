import React from "react";
import Header from "../components/common/Header";
import useTokenValidation from "../hooks/useTokenValidation";

function ProfilePage() {
  useTokenValidation();
  return (
    <div>
      <Header />
    </div>
  );
}

export default ProfilePage;
