import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/slices/productsSlice";
import { getProducts } from "../../redux/actions/productsActions";
import { Link } from "react-router-dom";

function ProductsTab() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const getProductsList = async () => {
    try {
      dispatch(getProducts());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductsList();
  }, []);

  return (
    <div className="w-[50%] h-[70vh] overflow-x-scroll bg-gray-800 text-white">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-600 sticky top-0">
          <tr>
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
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
                Info
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 divide-y divide-gray-700">
          {products.data ? (
            products.data.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/products/${product._id}`} className="text-sm bg-orange-700 px-2 rounded-md font-semibold hover:bg-orange-600 transition-all duration-300">Details</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-6 py-4 whitespace-nowrap text-center"
              >
                There are no products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTab;
