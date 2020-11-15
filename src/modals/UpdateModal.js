import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PuffLoader } from "react-spinners";
import { fetchProduct, updateProduct } from "../api";
import { useHistory } from "react-router-dom";

export default function UpdateModal({ item_id, onClose }) {
  const [loading, setLoading] = useState(false);
  const [productObject, setProductObject] = useState();

  const [updateName, setUpdateName] = useState("");
  const [updatePrice, setUpdatePrice] = useState(0);
  const [updateStock, setUpdateStock] = useState(0);
  const [updateWarning, setUpdateWarning] = useState(0);
  const [updatePromotion, setUpdatePromotion] = useState("");
  const [updateImage, setUpdateImage] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");

  const history = useHistory();
  useEffect(() => {
    setLoading(true);

    Promise.all([fetchProduct(item_id)]).then((recievedObject) => {
      setProductObject(recievedObject[0]);
      setUpdateName(recievedObject[0].product_name);
      setUpdatePrice(recievedObject[0].price);
      setUpdateStock(recievedObject[0].current_stock);
      setUpdateWarning(recievedObject[0].stock_warning);
      setUpdatePromotion(recievedObject[0].promotion);
      setUpdateImage(recievedObject[0].image_url);
      setUpdateDescription(recievedObject[0].description);
      setLoading(false);
    });
  }, [item_id]);

  function handleNameUpdate(event) {
    event.preventDefault();
    setUpdateName(event.target.value);
  }

  function handlePriceUpdate(event) {
    event.preventDefault();
    setUpdatePrice(event.target.value);
  }

  function handleStockUpdate(event) {
    event.preventDefault();
    setUpdateStock(event.target.value);
  }

  function handleWarningUpdate(event) {
    event.preventDefault();
    setUpdateWarning(event.target.value);
  }

  function handlePromotionUpdate(event) {
    event.preventDefault();
    setUpdatePromotion(event.target.value);
  }

  function handleImageUpdate(event) {
    event.preventDefault();
    setUpdateImage(event.target.value);
  }
  function handleDescriptionUpdate(event) {
    event.preventDefault();
    setUpdateDescription(event.target.value);
  }

  function handleUpdate(event) {
    event.preventDefault();

    let finalNewName = updateName;
    let finalNewPrice = +parseFloat(updatePrice).toFixed(2);
    let finalNewStock = parseInt(updateStock);
    let finalNewWarning = parseInt(updateWarning);
    let finalNewPromotion = updatePromotion;
    let finalImage = updateImage;
    let finalDescription = updateDescription;

    if (finalNewName === "") {
      document.getElementById("update-product-input").classList.add("invalid");
      return false;
    }

    if (isNaN(finalNewPrice) || finalNewPrice === null || finalNewPrice < 0) {
      document.getElementById("update-price-input").classList.add("invalid");
      return false;
    }

    if (isNaN(finalNewStock) || finalNewStock === null || finalNewStock < 0) {
      document
        .getElementById("update-current-stock-input")
        .classList.add("invalid");
      return false;
    }

    if (
      isNaN(finalNewWarning) ||
      finalNewWarning === null ||
      finalNewWarning < 0
    ) {
      document
        .getElementById("update-stock-warning-input")
        .classList.add("invalid");
      return false;
    }

    // https://stackoverflow.com/questions/9714525/javascript-image-url-verify
    if (
      finalImage.match(/\.(jpeg|jpg|gif|png)$/) != null ||
      finalImage === ""
    ) {
      document.getElementById("update-img-input").classList.add("invalid");
      return false;
    }

    if (finalDescription === "") {
      document
        .getElementById("update-description-input")
        .classList.add("invalid");
      return false;
    }

    if (finalNewPromotion === "") {
      finalNewPromotion = null;
    }
    console.log(finalNewStock);

    document.getElementById("update-product-input").classList.add("valid");
    document.getElementById("update-price-input").classList.add("valid");
    document
      .getElementById("update-current-stock-input")
      .classList.add("valid");
    document
      .getElementById("update-stock-warning-input")
      .classList.add("valid");
    document.getElementById("update-promotion-input").classList.add("valid");
    document.getElementById("update-img-input").classList.add("valid");
    document.getElementById("update-description-input").classList.add("valid");
    
    console.log(finalNewPrice);

    updateProduct(item_id, {
      product_name: finalNewName,
      price: finalNewPrice,
      current_stock: finalNewStock,
      stock_warning: finalNewWarning,
      promotion: finalNewPromotion,
      image_url: finalImage,
      description: finalDescription,
    }).then((updateAPIProduct) => {
      onClose();
      history.push("/success-page-update");
    });
  }

  return createPortal(
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Stock Item</h5>
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
              {/* here add in pertinent information */}
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
              {!loading && productObject && (
                <>
                  {" "}
                  <form className="text-left mb-3 form-row">
                    <div className="form-group col-6">
                      <label htmlFor="update-product-input">
                        Product Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="update-product-input"
                        value={updateName}
                        onChange={handleNameUpdate}
                      ></input>
                    </div>

                    <div className="form-group col-6">
                      <label htmlFor="update-price-input">Price: </label>
                      <input
                        type="text"
                        className="form-control"
                        id="update-price-input"
                        value={updatePrice}
                        onChange={handlePriceUpdate}
                      ></input>
                    </div>

                    <div className="form-group col-6">
                      <label htmlFor="update-current-stock-input">
                        Current Stock:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="update-current-stock-input"
                        value={updateStock}
                        onChange={handleStockUpdate}
                      ></input>
                    </div>

                    <div className="form-group col-6">
                      <label htmlFor="update-stock-warning-input">
                        Stock Warning:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="update-stock-warning-input"
                        value={updateWarning}
                        onChange={handleWarningUpdate}
                      ></input>
                    </div>

                    <div className="form-group col-6">
                      <label htmlFor="update-promotion-input">Promotion?</label>
                      <input
                        type="text"
                        className="form-control"
                        id="update-promotion-input"
                        value={updatePromotion ? updatePromotion : ""}
                        onChange={handlePromotionUpdate}
                      ></input>
                    </div>

                    <div className="form-group col-12">
                      <label htmlFor="update-img-input">Image Url: </label>
                      <input
                        type="text"
                        className="form-control"
                        id="update-img-input"
                        value={updateImage}
                        onChange={handleImageUpdate}
                      ></input>
                    </div>

                    <div className="form-group col-12">
                      <label htmlFor="update-description-input">
                        Description:
                      </label>
                      <textarea
                        className="form-control"
                        id="update-description-input"
                        rows="3"
                        value={updateDescription}
                        onChange={handleDescriptionUpdate}
                      ></textarea>
                    </div>
                  </form>
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
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("admin-update-stock")
  );
}
