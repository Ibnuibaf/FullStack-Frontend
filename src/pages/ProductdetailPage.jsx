import React from "react";
import useTokenValidation from "../hooks/useTokenValidation";
import Header from "../components/common/Header";
import ProductDetailsTab from "../components/tables/ProductDetailsTab";

function ProductdetailPage() {
  useTokenValidation();
  return (
    <div className="h-screen">
      <Header />
      <div className=" h-full">
        <div className="px-10 py-4">
          <p className="text-3xl font-semibold">Product Details: </p>
        </div>
        <div className="flex items-center justify-center">

        <ProductDetailsTab />
        </div>
      </div>
    </div>
  );
}

export default ProductdetailPage;
