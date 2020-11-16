import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PuffLoader } from "react-spinners";
import { fetchProduct } from "../api";

// simple modal for the user to check information on the stock item
export default function GuestModal({ item_id, onClose }) {
  const [loading, setLoading] = useState(false);

  // hold the object that we GET
  const [productObject, setProductObject] = useState({});

  useEffect(() => {
    setLoading(true);

    Promise.all([fetchProduct(item_id)]).then((recievedObject) => {
      setProductObject(recievedObject[0]);
      setLoading(false);
    });
  }, [item_id]);

  return createPortal(
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                More Information on
                {!loading ? `: ${productObject.product_name}` : "..."}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <span aria-hidden="true" className="modify-x">
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              {/* if the data is still being rendered show a loader */}
              {loading && (
                <>
                  <div className="container d-flex justify-content-center ">
                    <div className="row">
                      <div className="col">
                        <PuffLoader
                          color="white"
                          size="100px"
                          loading={loading}
                        />
                      </div>
                    </div>
                  </div>{" "}
                </>
              )}
              {/* here add in pertinent information */}
              {!loading && (
                <>
                  <div>{`Price: $${productObject.price}`}</div>
                  <div>{`Current Stock: ${productObject.current_stock} ${productObject.product_name}`}</div>
                  <div>
                    Promotions:
                    {productObject.promotion
                      ? ` ${productObject.promotion}`
                      : " none"}
                  </div>
                  <div>{`Description: ${productObject.description}`}</div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("guest-stock-modal")
  );
}
