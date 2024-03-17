import React from "react";
import Header from "../components/common/Header";
import ReviewDetailsTab from "../components/tables/ReviewDetailsTab";
import useTokenValidation from "../hooks/useTokenValidation";
import useAdminCheck from "../hooks/useAdminCheck";


function ReviewdetailPage() {
  useTokenValidation()
  useAdminCheck()
  return (
    <div className="h-screen">
      <Header />
      <div className=" h-full">
        <div className="px-10 py-4">
          <p className="text-3xl font-semibold">Review Updated Details: </p>
        </div>
        <div className="flex items-center justify-center">
          <ReviewDetailsTab />
        </div>
      </div>
    </div>
  );
}

export default ReviewdetailPage;
