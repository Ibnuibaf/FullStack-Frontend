import React from "react";
import Header from "../components/common/Header";
import ReviewsTab from "../components/tables/ReviewsTab";

function MysubmissionsPage() {
  return (
    <div className="">
      <Header />
      <p className="text-slate-700 text-center text-3xl font-semibold">My Submissions</p>
      <div className="flex justify-center items-center p-5 h-full">
        <ReviewsTab />
      </div>
    </div>
  );
}

export default MysubmissionsPage;
