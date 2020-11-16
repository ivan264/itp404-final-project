import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PuffLoader } from "react-spinners";
import { fetchProduct, updateProduct } from "../api";
import { useHistory } from "react-router-dom";

// modal that shows a form with pre-filled information
// such that an admin can update stuff
export default function UpdateModal({ item_id, onClose }) {
  const [loading, setLoading] = useState(false);
  // holds the object we GET
  const [productObject, setProductObject] = useState();

  // states for onChange funcitons
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
      // not pretty i admit but this is just to set all the values
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

  // ALL of the following are onChange functions
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

  // custom form validation~
  function handleUpdate(event) {
    event.preventDefault();

    // make copies or parse values
    let finalNewName = updateName;
    let finalNewPrice = +parseFloat(updatePrice).toFixed(2);
    let finalNewStock = parseInt(updateStock);
    let finalNewWarning = parseInt(updateWarning);
    let finalNewPromotion = updatePromotion;
    let finalImage = updateImage;
    let finalDescription = updateDescription;

    // all the following show if something went wrong i.e. didnt put in a value
    if (finalNewName === "") {
      document.getElementById("update-product-input").classList.add("invalid");
      document
        .getElementById("invalid-update-name")
        .classList.remove("invisible");
      document.getElementById("invalid-update-name").classList.add("visible");
      return false;
    }

    if (isNaN(finalNewPrice) || finalNewPrice === null || finalNewPrice < 0) {
      document.getElementById("update-price-input").classList.add("invalid");
      document
        .getElementById("invalid-update-price")
        .classList.remove("invisible");
      document.getElementById("invalid-update-price").classList.add("visible");
      return false;
    }

    if (isNaN(finalNewStock) || finalNewStock === null || finalNewStock < 0) {
      document
        .getElementById("update-current-stock-input")
        .classList.add("invalid");
      document
        .getElementById("invalid-update-stock")
        .classList.remove("invisible");
      document.getElementById("invalid-update-stock").classList.add("visible");
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
      document
        .getElementById("invalid-update-warning")
        .classList.remove("invisible");
      document
        .getElementById("invalid-update-warning")
        .classList.add("visible");
      return false;
    }

    // https://stackoverflow.com/questions/9714525/javascript-image-url-verify
    if (
      finalImage.match(/\.(jpeg|jpg|gif|png)$/) != null ||
      finalImage === ""
    ) {
      document.getElementById("update-img-input").classList.add("invalid");
      document.getElementById("invalid-update-url").classList.add("visible");
      document
        .getElementById("invalid-update-url")
        .classList.remove("invisible");
      return false;
    }

    if (finalDescription === "") {
      document
        .getElementById("update-description-input")
        .classList.add("invalid");
      document
        .getElementById("invalid-update-description")
        .classList.add("visible");
      document
        .getElementById("invalid-update-description")
        .classList.remove("invisible");
      return false;
    }

    if (finalNewPromotion === "") {
      finalNewPromotion = null;
    }

    // if we reach this part show the form as good
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

    // call the updateProduct function
    updateProduct(item_id, {
      product_name: finalNewName,
      price: finalNewPrice,
      current_stock: finalNewStock,
      stock_warning: finalNewWarning,
      promotion: finalNewPromotion,
      image_url: finalImage,
      description: finalDescription,
    }).then((updateAPIProduct) => {
      // once done, close the modal
      onClose();
      // redirect to a success page
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
              {/* here add in pertinent information */}
              {!loading && productObject && (
                <>
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
                      <div
                        id="invalid-update-name"
                        className="text-danger invisible"
                      >
                        Please provide a name
                      </div>
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
                      <div
                        id="invalid-update-price"
                        className="text-danger invisible"
                      >
                        Please provide a number
                      </div>
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
                      <div
                        id="invalid-update-stock"
                        className="text-danger invisible"
                      >
                        Please provide a number
                      </div>
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
                      <div
                        id="invalid-update-warning"
                        className="text-danger invisible"
                      >
                        Please provide a number
                      </div>
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
                      <div
                        id="invalid-update-url"
                        className="text-danger invisible"
                      >
                        Please provide a url
                      </div>
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
                      <div
                        id="invalid-update-description"
                        className="text-danger invisible"
                      >
                        Please provide a description
                      </div>
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
