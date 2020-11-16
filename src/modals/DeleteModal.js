import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PuffLoader } from "react-spinners";
import { fetchProduct, deleteProduct } from "../api";
import {useHistory} from "react-router-dom";

// this modal will appear when an admin tries to delete something
// paramters are the id of the stock and function to close
export default function DeleteModal({ item_id, onClose }) {

  // so that we can later redirect
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  // store what product was GET?GOT?
  const [productObject, setProductObject] = useState();

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchProduct(item_id)]).then((recievedObject) => {
      setProductObject(recievedObject[0]);
      setLoading(false);
    });
  }, [item_id]);

  // if the user wants to delete for sure,
  function handleDelete(deleteItemID) {
    // call the delete function
    deleteProduct(deleteItemID).then(() => {

      // once done, close the modal 
      onClose();
      // and redirect to a success page
      history.push("/success-page-delete");
    });
  }

  return createPortal(
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Delete
                {!loading && productObject
                  ? ` ${productObject.product_name}?`
                  : "?"}
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
                  <div className="container d-flex justify-content-center">
                    <div className="row">
                      <div className="col">
                        <PuffLoader
                          size="100px"
                          color="white"
                          loading={loading}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {/*  if finished loading here add in pertinent information */}
              {!loading && productObject && (
                <p>
                  Are you sure you want to delete {productObject.product_name}?
                  Once deleted they cannot be recovered 😐
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onClose}
              >
                Cancel
              </button>

              {!loading && productObject && (
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={() => handleDelete(productObject.id)}
                >
                  Delete?
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("admin-delete-stock")
  );
}
