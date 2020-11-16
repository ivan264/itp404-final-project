import React, { useEffect, useState } from "react";
import AdminCard from "./AdminCard";
import { fetchProducts } from "../api";
import { PuffLoader } from "react-spinners";
import DeleteModal from "../modals/DeleteModal";
import UpdateModal from "../modals/UpdateModal";

export default function AdminUpdateDelete() {
  // gets the products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // checks what product was clicked
  const [productClicked, setProductClicked] = useState("");

  // determines if the modals needs be opened
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  document.title = "Add or Delete Items";

  useEffect(() => {
    setLoading(true);

    Promise.all([fetchProducts()]).then((returnedProducts) => {
      const allProducts = returnedProducts[0];
      setProducts(allProducts);
      setLoading(false);
    });
  }, []);

  // open the updateModal
  function openUpdateModal(productID) {
    setIsUpdateModal(true);
    setProductClicked(productID);
  }

  // closes the updateModal
  function closeUpdateModal() {
    setIsUpdateModal(false);
  }

  // opens the delete modal
  function openDeleteModal(productID) {
    setIsDeleteModal(true);
    setProductClicked(productID);
  }

  // closes the delete modal
  function closeDeleteModal() {
    setIsDeleteModal(false);
  }

  return (
    <>
      {isUpdateModal && (
        <UpdateModal item_id={productClicked} onClose={closeUpdateModal} />
      )}
      {isDeleteModal && (
        <DeleteModal item_id={productClicked} onClose={closeDeleteModal} />
      )}
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
