import React, { useEffect, useState } from "react";
import StockCard from "./StockCard";
import { fetchProducts } from "../api";
import { PuffLoader } from "react-spinners";
import GuestModal from "../modals/GuestModal";

export default function GuestStock() {

  document.title = "Stock Page";
  
  // state to hold products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // determines if modal needs be opened
  const [isGuestModal, setIsGuestModal] = useState(false);
  // checcks what product was clickd
  const [productClicked, setProductClicked] = useState("");

  useEffect(() => {
    setLoading(true);

    Promise.all([fetchProducts()]).then((returnedProducts) => {
      // basically only show what items are in stock i.e. nonzero
      const filteredResults = returnedProducts[0].filter(
        (product) => product.current_stock !== 0
      );

      setProducts(filteredResults);
      setLoading(false);
    });
  }, []);

  // function to open modal
  function openGuestModal(productID) {
    setIsGuestModal(true);
    setProductClicked(productID);
  }

  // function to close modal
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
