import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectReviews } from "../../redux/slices/reviewsSlice";
import { getReviews } from "../../redux/actions/reviewsActions";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../axios/api";

function ReviewDetailsTab() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const [reviewDetail, setReviewDetail] = useState({});
  const { reviewId } = useParams();
  const getReviewDetails = async () => {
    dispatch(getReviews());
    const details = reviews.data.find((review) => review._id == reviewId);
    setReviewDetail(details);
  };
  useEffect(() => {
    getReviewDetails();
  }, []);

  const approveRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("_id", reviewDetail.product._id);
      formData.append("id", reviewDetail.updatedDetails.id);
      formData.append("image", reviewDetail.updatedDetails.image);
      formData.append("price", reviewDetail.updatedDetails.price);
      formData.append(
        "productDescription",
        reviewDetail.updatedDetails.productDescription
      );
      formData.append("productName", reviewDetail.updatedDetails.productName);
      formData.append("department", reviewDetail.updatedDetails.department);
      await api.patch("/product/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const res = await api.patch("/review/status", {
        _id: reviewDetail._id,
        status: "approved",
      });
      toast.success(res.data.message);
      navigate("/pending-requests");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };
  const rejectRequest = async () => {
    try {
      const res = await api.patch("/review/status", {
        _id: reviewDetail._id,
        status: "rejected",
      });
      toast.success(res.data.message);
      navigate("/pending-requests");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  if (!reviewDetail || !reviewDetail.product || !reviewDetail.updatedDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="flex gap-2 my-3">
        <button
          onClick={() => approveRequest()}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Approve
        </button>
        <button onClick={()=>rejectRequest()} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
          Reject
        </button>
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md max-w-xl">
          <p className="text-white font-semibold">Product Details:</p>
          <div className="flex flex-col md:flex-row p-3">
            <div className="md:w-1/2 flex flex-col justify-center items-center">
              <img
                src={reviewDetail.product.image}
                alt={reviewDetail.product.productName}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />

              <h2 className="text-lg font-semibold mb-2">
                {reviewDetail.product.productName}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                ${reviewDetail.product.price}
              </p>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {reviewDetail.product.productDescription}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Department: {reviewDetail.product.department}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md max-w-xl">
          <p className="text-white font-semibold">Updated Details:</p>
          <div className="flex flex-col md:flex-row p-3">
            <div className="md:w-1/2 flex flex-col justify-center items-center">
              <img
                src={reviewDetail.updatedDetails.image}
                alt={reviewDetail.updatedDetails.productName}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">
                {reviewDetail.updatedDetails.productName}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                ${reviewDetail.updatedDetails.price}
              </p>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {reviewDetail.updatedDetails.productDescription}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Department: {reviewDetail.updatedDetails.department}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetailsTab;
