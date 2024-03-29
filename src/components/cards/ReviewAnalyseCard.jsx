import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../axios/api";

function ReviewAnalyseCard() {
  const user = useSelector(selectUser);
  const [analitics, setAnalitics] = useState([]);
  const getAnalytics = async () => {
    try {
      const res = await api.get("/review/analitics");
      setAnalitics(res.data.analitics);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getAnalytics();
  }, []);
  return (
    <div className="px-10 py-5 grid grid-cols-2 gap-5">
      <div className="bg-slate-800 rounded-3xl p-4">
        <p className="text-3xl text-white font-semibold underline">
          Request Analytics
        </p>
        <div className="flex flex-col items-center justify-between px-5 mt-3 gap-5">
          {analitics.map((stat) => (
            <div
              className={`bg-slate-300 w-full rounded-md font-semibold text-lg p-2 text-${
                stat.status == "pending"
                  ? "orange"
                  : stat.status == "approved"
                  ? "green"
                  : stat.status == "rejected"
                  ? "pink"
                  : ""
              }-700`}
            >
              <p>{stat.status.toUpperCase()}:</p>
              <p className="italic text-xl font-bold text-slate-700 transition-all duration-500 animate-pulse">
                {stat.count}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800 rounded-3xl p-4 text-white flex flex-col justify-between min-w-60">
        <div>
          <p className="font-bold text-xl text-center my-3">User Details</p>
          <label htmlFor="">Email</label>
          <p className="text-lg text-center mb-4 bg-gray-500">
            {user.data.email}
          </p>
          <label htmlFor="">Role</label>
          <p className="text-lg text-center font-semibold bg-gray-500 text-pink-700/80 mb-4">
            {user.data.role && user.data.role.toUpperCase()}
          </p>
          <p className="text-gray-400 text-center">
            Welcome to your profile page. Here you can view and manage your
            account details.
          </p>
          <p className="text-gray-400 text-center">
            If you need any assistance, feel free to contact our support team.
          </p>
        </div>
        <Link
          to={"/dashboard"}
          className="text-center bg-blue-900 rounded-md py-1"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}

export default ReviewAnalyseCard;
