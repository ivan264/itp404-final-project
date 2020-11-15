import React, { useEffect, useState } from "react";
import StockCard from "./StockCard";
import { fetchProducts } from "../api";
import { PuffLoader } from "react-spinners";
import GuestModal from "../modals/GuestModal";

export default function GuestStock() {

  document.title = "Stock Page";
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isGuestModal, setIsGuestModal] = useState(false);
  const [productClicked, setProductClicked] = useState("");

  useEffect(() => {
    setLoading(true);

    Promise.all([fetchProducts()]).then((returnedProducts) => {
      const filteredResults = returnedProducts[0].filter(
        (product) => product.current_stock !== 0
      );

      setProducts(filteredResults);
      setLoading(false);
    });
  }, []);

  function openGuestModal(productID) {
    setIsGuestModal(true);
    setProductClicked(productID);
  }

  function closeGuestModal() {
    setIsGuestModal(false);
  }

  return (
    <>
      {isGuestModal && (
        <GuestModal onClose={closeGuestModal} item_id={productClicked} />
      )}
      <h3 className="text-center mt-3">Current Inventory...Visit us Today!</h3>
      <hr className="brown-hr"></hr>

      {/* bunch of cards finna make 1 rn */}
      <div className="container text-center d-flex justify-content-center">
        <div className="row mb-3">
          {loading && (
            <div className="col">
              <PuffLoader size="100px" color="#ffffff" loading={loading} />
            </div>
          )}

          {!loading &&
            products.length > 0 &&
            products.map((product) => {
              return (
                <StockCard
                  image_url={product.image_url}
                  item_name={product.product_name}
                  item_price={product.price}
                  item_id={product.id}
                  key={product.id}
                  onClick={() => openGuestModal(product.id)}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
