import React, { useEffect, useState } from "react";
import AdminCard from "./AdminCard";
import { fetchProducts } from "../api";
import { PuffLoader } from "react-spinners";
import DeleteModal from "../modals/DeleteModal";
import UpdateModal from "../modals/UpdateModal";

export default function AdminDashboard() {
  const [lowItems, setLowItems] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);
  const [loading, setLoading] = useState();

  const [productClicked, setProductClicked] = useState("");
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [iseDeleteModal, setIsDeleteModal] = useState(false);

  document.title = "Inventory Dashboard";

  useEffect(() => {
    setLoading(true);

    Promise.all([fetchProducts()]).then((returnedProducts) => {
      const filteredLowResults = returnedProducts[0].filter(
        (product) =>
          product.current_stock < product.stock_warning &&
          product.current_stock !== 0
      );

      const filteredEmptyResults = returnedProducts[0].filter(
        (product) => product.current_stock === 0
      );

      setLowItems(filteredLowResults);
      setOutOfStock(filteredEmptyResults);
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
      {isUpdateModal && (
        <UpdateModal item_id={productClicked} onClose={closeUpdateModal} />
      )}
      {iseDeleteModal && (
        <DeleteModal item_id={productClicked} onClose={closeDeleteModal} />
      )}
      <h3 className="text-center mt-3">Inventory Dashboard</h3>
      <hr className="brown-hr"></hr>

      {!loading && lowItems.length === 0 && outOfStock.length === 0 && (
        <p className="text-center">
          You have no current messages. Messages will appear when it is time to
          stock up on a specific item.
        </p>
      )}

      {!loading && lowItems.length === 0 && (
        <p className="text-center">All items are above the low-item warning.</p>
      )}

      {!loading && lowItems.length > 0 && (
        <h4 className="text-center text-warning">
          Warning! These item(s) are almost out of stock:
        </h4>
      )}

      <div className="container d-flex justify-content-center">
        <div className="row mb-3 d-flex justify-content-center">
          {loading && (
            <div className="col">
              <PuffLoader size="100px" color="#ffffff" loading={loading} />
            </div>
          )}
          {!loading &&
            lowItems.length > 0 &&
            lowItems.map((lowItem) => (
              <AdminCard
                key={lowItem.id}
                image_url={lowItem.image_url}
                item_name={lowItem.product_name}
                item_price={lowItem.price}
                item_id={lowItem.id}
                onClickUpdate={() => openUpdateModal(lowItem.id)}
                onClickDelete={() => openDeleteModal(lowItem.id)}
              />
            ))}
        </div>
      </div>

      {!loading && outOfStock.length === 0 && (
        <p className="text-center">All items are in stock</p>
      )}
      {!loading && outOfStock.length > 0 && (
        <h4 className="text-center text-danger">
          Warning! These item(s) are out of stock:
        </h4>
      )}

      {(!loading && outOfStock.length) > 0 && (
        <div className="container d-flex justify-content-center">
          <div className="row mb-3 d-flex justify-content-center">
            {loading && (
              <div className="col">
                <PuffLoader size="100px" color="#ffffff" loading={loading} />
              </div>
            )}
            {!loading &&
              outOfStock.length > 0 &&
              outOfStock.map((outOfItem) => (
                <AdminCard
                  key={outOfItem.id}
                  image_url={outOfItem.image_url}
                  item_name={outOfItem.product_name}
                  item_price={outOfItem.price}
                  item_id={outOfItem.id}
                  onClickUpdate={() => openUpdateModal(outOfItem.id)}
                  onClickDelete={() => openDeleteModal(outOfItem.id)}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
