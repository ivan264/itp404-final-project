import React, { useState } from "react";
import { addProduct } from "../api";
import StockCard from "../guest-pages/StockCard";
import GuestModal from "../modals/GuestModal";

export default function AdminAddStock() {
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState(-1);
  const [newStock, setNewStock] = useState(-1);
  const [newWarning, setNewWarning] = useState(-1);
  const [newPromotion, setNewPromotion] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [addedProduct, setAddedProduct] = useState();

  const [isGuestModal, setIsGuestModal] = useState(false);
  const [productClicked, setProductClicked] = useState("");

  document.title = "Add Stock";

  function handleName(event) {
    event.preventDefault();
    setNewName(event.target.value);
  }

  function handlePrice(event) {
    event.preventDefault();
    setNewPrice(event.target.value);
  }

  function handleCurrentStock(event) {
    event.preventDefault();
    setNewStock(event.target.value);
  }

  function handleStockWarning(event) {
    event.preventDefault();
    setNewWarning(event.target.value);
  }

  function handlePromotion(event) {
    event.preventDefault();
    setNewPromotion(event.target.value);
  }

  function handleImage(event) {
    event.preventDefault();
    setNewImage(event.target.value);
  }

  function handleDescription(event) {
    event.preventDefault();
    setNewDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let finalNewName = newName;
    let finalNewPrice = +parseFloat(newPrice).toFixed(2);
    let finalNewStock = parseInt(newStock);
    let finalNewWarning = parseInt(newWarning);
    let finalNewPromotion = newPromotion;
    let finalImage = newImage;
    let finalDescription = newDescription;

    // Validation will be for correct numbers and to check if data was actually entered
    // only "Promotion" is not a required field
    if (finalNewName === "") {
      document.getElementById("product-input").classList.add("invalid");
      document.getElementById("invalid-name").classList.add("visible");
      return false;
    }

    if (finalNewPrice === "NaN" || finalNewPrice < 0) {
      document.getElementById("price-input").classList.add("invalid");
      document.getElementById("invalid-price").classList.add("visible");
      return false;
    }

    if (finalNewStock === "NaN" || finalNewStock < 0) {
      document.getElementById("current-stock-input").classList.add("invalid");
      document.getElementById("invalid-stock").classList.add("visible");
      return false;
    }

    if (finalNewWarning === "NaN" || finalNewWarning < 0) {
      document.getElementById("stock-warning-input").classList.add("invalid");
      document.getElementById("invalid-warning").classList.add("visible");
      return false;
    }

    // https://stackoverflow.com/questions/9714525/javascript-image-url-verify
    if (
      finalImage.match(/\.(jpeg|jpg|gif|png)$/) != null ||
      finalImage === ""
    ) {
      document.getElementById("img-input").classList.add("invalid");
      document.getElementById("invalid-url").classList.add("visible");
      return false;
    }

    if (finalDescription === "") {
      document.getElementById("description-input").classList.add("invalid");
      document.getElementById("invalid-description").classList.add("visible");
      return false;
    }

    if (finalNewPromotion === "") {
      finalNewPromotion = null;
    }

    // if reach here then all data is valid so show that
    document.getElementById("product-input").classList.add("valid");
    document.getElementById("price-input").classList.add("valid");
    document.getElementById("current-stock-input").classList.add("valid");
    document.getElementById("stock-warning-input").classList.add("valid");
    document.getElementById("promotion-input").classList.add("valid");
    document.getElementById("img-input").classList.add("valid");
    document.getElementById("description-input").classList.add("valid");

    document.getElementById("invalid-name").classList.add("invisible");
    document.getElementById("invalid-price").classList.add("invisible");
    document.getElementById("invalid-stock").classList.add("invisible");
    document.getElementById("invalid-warning").classList.add("invisible");
    document.getElementById("invalid-url").classList.add("invisible");
    document.getElementById("invalid-description").classList.add("invisible");
    


    addProduct({
      product_name: finalNewName,
      price: finalNewPrice,
      current_stock: finalNewStock,
      stock_warning: finalNewWarning,
      promotion: finalNewPromotion,
      image_url: finalImage,
      description: finalDescription,
    }).then((newProduct) => {
      setAddedProduct(newProduct);
    });
  }
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
      <h3 className="text-center mt-3">Add Stock Item</h3>
      <hr className="brown-hr"></hr>

      <form className="text-left mb-3 form-row">
        <div className="form-group col-6">
          <label htmlFor="product-input">Product Name: </label>
          <input
            type="text"
            className="form-control"
            id="product-input"
            onChange={handleName}
          ></input>
          <div id="invalid-name" className="text-danger invisible">
            Please provide a name
          </div>
        </div>

        <div className="form-group col-6">
          <label htmlFor="price-input">Price: </label>
          <input
            type="text"
            className="form-control"
            id="price-input"
            onChange={handlePrice}
          ></input>
          <div id="invalid-price" className="text-danger invisible">
            Please provide a number
          </div>
        </div>

        <div className="form-group col-6">
          <label htmlFor="current-stock-input">Current Stock: </label>
          <input
            type="text"
            className="form-control"
            id="current-stock-input"
            onChange={handleCurrentStock}
          ></input>
          <div id="invalid-stock" className="text-danger invisible">
            Please provide a number
          </div>
        </div>

        <div className="form-group col-6">
          <label htmlFor="stock-warning-input">Stock Warning: </label>
          <input
            type="text"
            className="form-control"
            id="stock-warning-input"
            onChange={handleStockWarning}
          ></input>
          <div id="invalid-warning" className="text-danger invisible">
            Please provide a number
          </div>
        </div>

        <div className="form-group col-6">
          <label htmlFor="promotion-input">Promotion? </label>
          <input
            type="text"
            className="form-control"
            id="promotion-input"
            onChange={handlePromotion}
          ></input>
        </div>

        <div className="form-group col-12">
          <label htmlFor="img-input">Image Url: </label>
          <input
            type="text"
            className="form-control"
            id="img-input"
            onChange={handleImage}
          ></input>
          <div id="invalid-url" className="text-danger invisible">
            Please provide a url
          </div>
        </div>

        <div className="form-group col-12">
          <label htmlFor="img-input">Description: </label>
          <textarea
            className="form-control"
            id="description-input"
            rows="3"
            onChange={handleDescription}
          ></textarea>
          <div id="invalid-description" className="text-danger invisible">
            Please provide a description
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>

      <div className="container text-center mb-4">
        {addedProduct && <div>The following has been added: </div>}
        <div className="row d-flex justify-content-center">
          {addedProduct && (
            <StockCard
              image_url={addedProduct.image_url}
              item_name={addedProduct.product_name}
              item_price={addedProduct.price}
              item_id={addedProduct.id}
              key={addedProduct.id}
              onClick={() => openGuestModal(addedProduct.id)}
            />
          )}
        </div>
      </div>
    </>
  );
}
