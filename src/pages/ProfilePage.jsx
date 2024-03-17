import React from "react";
import Header from "../components/common/Header";
import useTokenValidation from "../hooks/useTokenValidation";
import ReviewAnalyseCard from "../components/cards/ReviewAnalyseCard";
import ProfilePageBtn from "../components/common/ProfilePageBtn";
function ProfilePage() {
  useTokenValidation();
  return (
    <div>
      <Header />
      <div>
        <div className="flex justify-between px-8 py-4">
          <p className="text-center font-semibold text-3xl text-slate-600">
            User Profile
          </p>
          <ProfilePageBtn />
        </div>
        <ReviewAnalyseCard />
      </div>
    </div>
  );
}

export default ProfilePage;
