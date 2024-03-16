import React from "react";
import useTokenValidation from "../hooks/useTokenValidation";
import api from "../axios/api";
import axios from "axios";
import Header from "../components/common/Header";
import ProductsTab from "../components/tables/ProductsTab";

function DashboardPage() {
  useTokenValidation();
  
  return <div className="h-screen">
    <Header></Header>
    <div className="flex justify-center items-center h-full">
      <ProductsTab/>
    </div>
  </div>;
}

export default DashboardPage;
