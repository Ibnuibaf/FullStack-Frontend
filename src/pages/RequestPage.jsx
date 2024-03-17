import React from "react";
import Header from "../components/common/Header";
import ReviewsTab from "../components/tables/ReviewsTab";
import useTokenValidation from "../hooks/useTokenValidation";
import useAdminCheck from "../hooks/useAdminCheck";

function RequestPage() {
  useTokenValidation()
  useAdminCheck()
  return (
    <div>
      <Header />
      <p className="text-slate-700 text-center text-3xl font-semibold">
        Pending Requests
      </p>
      <div className="flex justify-center items-center p-5 h-full">
        <ReviewsTab />
      </div>
    </div>
  );
}

export default RequestPage;
