import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function useCheckToken() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      toast.error("User already loggedIn");
      return navigate("/dashboard");
    }
  }, [navigate]);

  return null;
}

export default useCheckToken;
