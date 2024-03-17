import React, { useEffect, useState } from "react";
import api from "../../axios/api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { getUser } from "../../redux/actions/userActions";

function Header() {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const user=useSelector(selectUser)
  const getUserDetails = async () => {
    dispatch(getUser())
  };
  useEffect(()=>{
    getUserDetails()
  },[])
  const logoutUser=async()=>{
    try {
      Cookies.remove("token")
      toast.success("User Logout")
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">PlyPicker</h1>
      </div>
      <div className="flex items-center gap-5">
        <Link to={'/profile'} className=" bg-slate-700 px-4 py-1 rounded-md hover:text-lg transition-all duration-300">{user.data.email}</Link>
        <p
          className={`text-sm font-semibold ${user.role === "admin" ? "text-green-500" : "text-yellow-500"}`}
        >
          {user.data.role}
        </p>
        <button
          onClick={()=>logoutUser()}
          className="text-sm px-4 py-2 rounded bg-red-500 hover:bg-red-600 focus:outline-none ml-4"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
