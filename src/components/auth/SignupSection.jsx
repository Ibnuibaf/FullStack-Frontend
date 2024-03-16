import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axios/api";
import toast from "react-hot-toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{8,}$/;

function SignupSection() {
  const [userDetails, setUserDetails] = useState();
  const navigate= useNavigate()
  const handleOnChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      if (!emailRegex.test(userDetails.email)) {
        return toast.error("Provide email address");
      }
      if (!passwordRegex.test(userDetails.password)) {
        return toast.error("Password must be at least 8 characters long.");
      }
      if (userDetails.role != "team member" && userDetails.role != "admin") {
        return toast.error("Please select a valid role.");
      }

      const res = await api.post("/user/register", userDetails);
      toast.success(res.data.message);
      navigate('/login')
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => submitForm(e)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={(e) => handleOnChange(e)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => handleOnChange(e)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Choose your Role
                </label>
                <div className="flex flex-row gap-2 cursor-pointer items-center">
                  <input
                    type="radio"
                    className="h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300"
                    name="role"
                    id="team member"
                    placeholder="Team Member"
                    value={"team member"}
                    onChange={(e) => handleOnChange(e)}
                    required
                  />
                  <label
                    htmlFor="team member"
                    className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Team Member
                  </label>
                </div>
                <div className="flex flex-row gap-2 cursor-pointer items-center">
                  <input
                    type="radio"
                    className="h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300"
                    name="role"
                    id="admin"
                    placeholder="Admin"
                    value={"admin"}
                    onChange={(e) => handleOnChange(e)}
                    required
                  />
                  <label
                    htmlFor="admin"
                    className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Admin
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-slate-900 text-white  hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupSection;
