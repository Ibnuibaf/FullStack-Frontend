import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/slices/productsSlice";
import { getProducts } from "../../redux/actions/productsActions";
import { useNavigate, useParams } from "react-router-dom";
import { selectUser } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";
import api from "../../axios/api";
import Modal from "../common/Modal";

function ProductDetailsTab() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);
  const user = useSelector(selectUser);
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const getProductDetails = async () => {
    dispatch(getProducts);
    if (products.data.length) {
      const details = products.data.find((product) => product._id == productId);
      setProductDetail(details);
    }
  };
  const handleOnChange = (e) => {
    setProductDetail({ ...productDetail, [e.target.name]: e.target.value });
  };
  const updateImageFile = (img) => {
    setImageFile(img);
    console.log(img);
  };
  const requestChange = async () => {
    try {
      if (
        !productDetail._id ||
        !productDetail.id ||
        !productDetail.image ||
        !productDetail.price ||
        !productDetail.productDescription ||
        !productDetail.productName ||
        !productDetail.department
      ) {
        return toast.error("Filled the required data for Request");
      }
      const formData = new FormData();
      formData.append("productId", productDetail._id);
      formData.append("id", productDetail.id);
      formData.append("image", productDetail.image);
      formData.append("price", productDetail.price);
      formData.append("productDescription", productDetail.productDescription);
      formData.append("productName", productDetail.productName);
      formData.append("department", productDetail.department);
      if (imageFile) {
        formData.append("imageFile", imageFile);
      }
      const res = await api.post("/review/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      handleEditModeReset();
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  const saveChangeDirectly = async () => {
    try {
      if (
        !productDetail._id ||
        !productDetail.id ||
        !productDetail.image ||
        !productDetail.price ||
        !productDetail.productDescription ||
        !productDetail.productName ||
        !productDetail.department
      ) {
        return toast.error("Filled the required data for Updating");
      }
      const formData = new FormData();
      formData.append("_id", productDetail._id);
      formData.append("id", productDetail.id);
      formData.append("image", productDetail.image);
      formData.append("price", productDetail.price);
      formData.append("productDescription", productDetail.productDescription);
      formData.append("productName", productDetail.productName);
      formData.append("department", productDetail.department);
      if (imageFile) {
        formData.append("imageFile", imageFile);
      }
      const res = await api.patch("/product/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      await getProductDetails();
      handleEditModeReset();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  const handleEditModeReset = () => {
    setIsEditMode(false);
    getProductDetails();
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
              onClick={() => handleEditModeReset()}
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
              // <label
              //   htmlFor="imageFile"
              //   className="cursor-pointer"
              //   title="Change Image"
              // >
              //  <input
              // type="file"
              // name="imageFile"
              // id="imageFile"
              // multiple={false}
              // className="hidden"
              // onChange={(e) => setImageFile(e.target.files[0])}
              // />
              <>
                <img
                  src={productDetail.image}
                  alt={productDetail.ProductName}
                  onClick={() => setIsModalOpen(true)}
                  className="w-52 h-52 object-cover rounded-md mb-4 cursor-pointer"
                />
                {isModalOpen && (
                  <Modal
                    closeModal={() => setIsModalOpen(false)}
                    updateImageFile={updateImageFile}
                  />
                )}
              </>
              // </label>
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
                onClick={() => saveChangeDirectly()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            ) : user.data.role == "team member" ? (
              <button
                onClick={() => requestChange()}
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
