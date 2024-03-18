import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectReviews } from "../../redux/slices/reviewsSlice";
import { getReviews } from "../../redux/actions/reviewsActions";
import { selectUser } from "../../redux/slices/userSlice";
import { Link } from "react-router-dom";

function ReviewsTab() {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const user = useSelector(selectUser);
  const getReviewsList = async () => {
    await dispatch(getReviews());
  };
  useEffect(() => {
    getReviewsList();
  }, []);
  return user.data.role == "team member" ? (
    <div className="w-[50%] h-[70vh] overflow-x-scroll bg-gray-800 text-white">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-600 sticky top-0">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Image
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Product Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Department
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 divide-y divide-gray-700">
          {reviews.data ? (
            reviews.data.map((review) => (
              <tr key={review._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(review.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p
                    className={`bg-white rounded-md px-2 font-semibold ${
                      review.status == "pending"
                        ? "text-orange-700"
                        : review.status == "approved"
                        ? "text-green-700"
                        : review.status == "rejected"
                        ? "text-pink-700"
                        : ""
                    }`}
                  >
                    {review.status}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {review.updatedDetails.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={review.updatedDetails.image}
                    alt={review.updatedDetails.productName}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {review.updatedDetails.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {review.updatedDetails.department}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-6 py-4 whitespace-nowrap text-center"
              >
                There are no reviews available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  ) : user.data.role == "admin" ? (
    <div className="w-[50%] h-[70vh] overflow-x-scroll bg-gray-800 text-white">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-600 sticky top-0">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Author
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Image
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Product Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Options
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 divide-y divide-gray-700">
          {reviews.data ? (
            reviews.data.map((review) => (
              <tr key={review._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(review.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {review.author.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {review.updatedDetails.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={review.updatedDetails.image}
                    alt={review.updatedDetails.productName}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {review.updatedDetails.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/pending-requests/${review._id}`}
                    className="text-sm bg-orange-700 px-2 rounded-md font-semibold hover:bg-orange-600 transition-all duration-300"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-6 py-4 whitespace-nowrap text-center"
              >
                There are no reviews available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  ) : (
    <></>
  );
}

export default ReviewsTab;
