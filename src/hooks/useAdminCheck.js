import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../redux/slices/userSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";

function useAdminCheck() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.data && user.data.role != "admin") {
      toast.error("No access to this page");
      navigate("/dashboard");
    }
  }, [navigate, user]);

  return null;
}

export default useAdminCheck;
