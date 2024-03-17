
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import 'react-image-crop/dist/ReactCrop.css'
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ProductdetailPage from "./pages/ProductdetailPage";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/actions/userActions";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch()
  const getUserDetails = async () => {
    dispatch(getUser())
  };
  useEffect(()=>{
    getUserDetails()
  },[])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/register" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard"element={<DashboardPage/>}/>
          <Route path="/products/:productId" element={<ProductdetailPage/>}/>
          <Route path="/profile"element={<ProfilePage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
