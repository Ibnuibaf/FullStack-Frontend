import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/slices/productsSlice";
import { getProducts } from "../../redux/actions/productsActions";
import { useParams } from "react-router-dom";
import { selectUser } from "../../redux/slices/userSlice";

function ProductDetailsTab() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const user = useSelector(selectUser);
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const getProductDetails = async () => {
    await dispatch(getProducts);
    const details = products.data.find((product) => product._id == productId);
    setProductDetail(details);
  };
  const handleOnChange = (e) => {
    setProductDetail({ ...productDetail, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <div className=" bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md max-w-xl">
      {isEditMode && (
        <div className="flex mb-2 transition-all duration-700 animate-pulse hover:animate-none">
          <p className="flex items-center gap-2 text-white bg-yellow-800 text-sm rounded-md px-2 font-bold">
            <b
              className="text-pink-300 text-xl cursor-pointer hover:text-pink-600"
              onClick={() => setIsEditMode(false)}
            >
              X
            </b>{" "}
            <span className="px-2">Edit Mode</span>
          </p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-2 ">
        <div className="md:w-1/2 flex flex-col justify-center items-center">
          {isEditMode ? (
            imageFile ? (
              <div className="w-52 h-52 flex items-center bg-gray-600 rounded-xl justify-center my-1">
                <p className="bg-black px-4 py-1 font-semibold text-white truncate">
                  <b
                    className="text-pink-300 text-xl cursor-pointer hover:text-pink-600"
                    onClick={() => setImageFile(null)}
                  >
                    X
                  </b>{" "}
                  {imageFile.name}
                </p>
              </div>
            ) : (
              <label
                htmlFor="imageFile"
                className="cursor-pointer"
                title="Change Image"
              >
                <input
                  type="file"
                  name="imageFile"
                  id="imageFile"
                  multiple={false}
                  className="hidden"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />

                <img
                  src={productDetail.image}
                  alt={productDetail.ProductName}
                  className="w-52 h-52 object-cover rounded-md mb-4"
                />
              </label>
            )
          ) : (
            <img
              src={productDetail.image}
              alt={productDetail.ProductName}
              className="w-52 h-52 object-cover rounded-md mb-4"
            />
          )}
          {isEditMode ? (
            <input
              type="text"
              name="productName"
              value={productDetail.productName}
              onChange={(e) => handleOnChange(e)}
              className="bg-gray-300/10 px-4 outline-none text-center text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300"
            />
          ) : (
            <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
              {productDetail.productName}
            </h2>
          )}
          {isEditMode ? (
            <div className="flex items-center bg-gray-300/10 px-3 text-lg font-semibold mb-2">
              <p className="text-pink-700 dark:text-pink-300">$</p>
              <input
                type="number"
                name="price"
                id=""
                onChange={(e) => handleOnChange(e)}
                value={productDetail.price}
                className="bg-transparent outline-none text-center  text-gray-700 dark:text-gray-300"
              />
            </div>
          ) : (
            <p className="text-pink-700 dark:text-pink-300 mb-4">
              ${productDetail.price}
            </p>
          )}
        </div>

        <div className="md:w-1/2 flex flex-col justify-center">
          {isEditMode ? (
            <textarea
              onChange={(e) => handleOnChange(e)}
              value={productDetail.productDescription}
              name="productDescription"
              className="h-32 w-64 bg-gray-300/10 px-1 outline-none  font-semibold mb-2 text-gray-700 dark:text-gray-300"
            ></textarea>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {productDetail.productDescription}
            </p>
          )}

          {isEditMode ? (
            <div className="flex items-baseline ">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Department:{" "}
              </p>
              <input
                onChange={(e) => handleOnChange(e)}
                value={productDetail.department}
                name="department"
                className=" font-bold bg-gray-300/10 px-1 outline-none  mb-2 text-gray-700 dark:text-gray-300"
              />
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Department:{" "}
              <i className="font-bold">{productDetail.department}</i>
            </p>
          )}
          {isEditMode ? (
            user.data.role == "admin" ? (
              <button
                onClick={() => {}}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            ) : user.data.role == "team member" ? (
              <button
                onClick={() => {}}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Request
              </button>
            ) : (
              <></>
            )
          ) : (
            <button
              onClick={() => setIsEditMode(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsTab;
