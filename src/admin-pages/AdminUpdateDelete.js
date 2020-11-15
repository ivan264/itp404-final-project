import React, { useEffect, useState } from "react";
import AdminCard from "./AdminCard";
import { fetchProducts } from "../api";
import { PuffLoader } from "react-spinners";
import DeleteModal from "../modals/DeleteModal";
import UpdateModal from "../modals/UpdateModal";
import { useHistory } from 'react-router';
export default function AdminUpdateDelete() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [productClicked, setProductClicked] = useState("");

  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);

    Promise.all([fetchProducts()]).then((returnedProducts) => {
      const allProducts = returnedProducts[0];
      setProducts(allProducts);
      setLoading(false);
    });
  }, []);

  function openUpdateModal(productID) {
    setIsUpdateModal(true);
    setProductClicked(productID);
  }

  function closeUpdateModal() {
    setIsUpdateModal(false);
  }

  function openDeleteModal(productID) {
    setIsDeleteModal(true);
    setProductClicked(productID);
  }

  function closeDeleteModal() {
    setIsDeleteModal(false);
  }

  return (
    <>
      {isUpdateModal && (<UpdateModal item_id={productClicked} onClose={closeUpdateModal} />)}
      {isDeleteModal && (<DeleteModal item_id={productClicked} onClose={closeDeleteModal} history={history}/>)}
      <h3 className="text-center mt-3">Update or Delete Stock Items</h3>
      <hr className="brown-hr"></hr>
      {/* iterate through the thing */}
      <div className="container mb-4">
        <div className="row d-flex justify-content-center">
          <PuffLoader color="white" size="100px" loading={loading} />
          {!loading &&
            products.length > 0 &&
            products.map((product) => (
              <AdminCard
                image_url={product.image_url}
                item_name={product.product_name}
                item_price={product.price}
                item_id={product.id}
                key={product.id}
                onClickUpdate={() => openUpdateModal(product.id)}
                onClickDelete={() => openDeleteModal(product.id)}
              />
            ))}
        </div>
      </div>
    </>
  );
}
