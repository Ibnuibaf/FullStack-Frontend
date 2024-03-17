import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { Link } from "react-router-dom";

function ProfilePageBtn() {
  const user = useSelector(selectUser);
  return (
    <>
      {user.data.role == "team member" ? (
        <Link
          to={"/profile/my-submissions"}
          className="bg-pink-600 px-4 py-1 rounded-md text-white font-semibold hover:bg-pink-700 transition-all duration-300"
        >
          My-Submissions
        </Link>
      ) : user.data.role == "admin" ? (
        <Link
          to={"/pending-requests"}
          className="bg-pink-600 px-4 py-1 rounded-md text-white font-semibold hover:bg-pink-700 transition-all duration-300"
        >
          Pending-Requests
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}

export default ProfilePageBtn;
