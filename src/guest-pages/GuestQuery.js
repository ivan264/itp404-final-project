import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import StockCard from "../guest-pages/StockCard";
import GuestModal from "../modals/GuestModal";

export default function GuestQuery() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [lowerPriceSearch, setLowerPriceSearch] = useState("0");
  const [upperPriceSearch, setUpperPriceSearch] = useState("100");

  const [searchTerm, setSearchTerm] = useState("");

  const [hasBeenSubmited, setHasBeenSubmited] = useState(false);

  const [isGuestModal, setIsGuestModal] = useState(false);
  const [productClicked, setProductClicked] = useState("");

  const [initialCopy, setInitalCopy] = useState([]);
  const [finalProducts, setFinalProducts] = useState([]);

  document.title = "Search Page";

  useEffect(() => {
    setLoading(true);

    Promise.all([fetchProducts()]).then((returnedProducts) => {
      const allProducts = returnedProducts[0];
      setProducts(allProducts);
      setLoading(false);
      setInitalCopy(allProducts);
    });
  }, []);

  function handleLowerInput(event) {
    event.preventDefault();
    setLowerPriceSearch(event.target.value);
  }

  function handleUpperInput(event) {
    event.preventDefault();
    setUpperPriceSearch(event.target.value);
  }

  function handleTermInput(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let finalLowerPrice = parseFloat(lowerPriceSearch).toFixed(2);
    let finalUpperPrice = parseFloat(upperPriceSearch).toFixed(2);
    let finalSearchTerm = searchTerm.toLowerCase();

    if (finalLowerPrice < 0 || finalLowerPrice === "NaN") {
      document.getElementById("price-lower-search").classList.add("invalid");
      document.getElementById("lower-price-invalid").classList.remove("invisible");
      document.getElementById("lower-price-invalid").classList.add("visible");
      return false;
    }

    if (finalUpperPrice > 999 || finalUpperPrice === "NaN") {
      document.getElementById("price-upper-search").classList.add("invalid");
      document.getElementById("upper-price-invalid").classList.remove("invisible");
      document.getElementById("upper-price-invalid").classList.add("visible");
      return false;
    }

    // I did not include validation for the search term because a product can be called anything
    // might even include numbers or special characters. Only real validation was setting it equal to lowercase
    // for matching purposes

    // if we reach this part of the code validation was passed and hence "show" a good form
    document.getElementById("price-lower-search").classList.add("valid");
    document.getElementById("price-upper-search").classList.add("valid");
    document.getElementById("name-search").classList.add("valid");

    document.getElementById("lower-price-invalid").classList.add("invisible");
    document.getElementById("upper-price-invalid").classList.add("invisible");

    let filteredProducts;

    if (finalSearchTerm === "") {
      filteredProducts = products.filter(
        (product) =>
          product.price > finalLowerPrice && product.price < finalUpperPrice
      );
    }

    filteredProducts = products.filter(
      (product) =>
        product.price > finalLowerPrice &&
        product.price < finalUpperPrice &&
        product.product_name.toLowerCase().includes(finalSearchTerm)
    );

    setProducts(initialCopy);
    setFinalProducts(filteredProducts);

    setLowerPriceSearch(finalLowerPrice);
    setUpperPriceSearch(finalUpperPrice);
    setSearchTerm(finalSearchTerm);
    setHasBeenSubmited(true);

    // change values inside of the input
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
      <h3 className="text-center mt-3">
        Looking for Something that Might be Out of Stock? 🤔
      </h3>
      <hr className="brown-hr"></hr>

      <p>
        Here you can search for items within some range or items according to
        their name.
      </p>
      <p>
        NOTE: All of these fields are optional meaning that you can search for a
        price without having to search for a name and vice versa. However, if
        none of these are filled then all stock options will be shown 😊
      </p>
      <form className="text-left mb-3 form-row">
        <div className="form-group col-6">
          <label htmlFor="price-lower-search">Lower Price Parameter: </label>
          <input
            type="text"
            className="form-control"
            id="price-lower-search"
            onChange={handleLowerInput}
          ></input>
          <div id="lower-price-invalid" className="text-danger invisible">
            Please provide a number
          </div>
        </div>
        <div className="form-group col-6">
          <label htmlFor="price-upper-search">Upper Price Parameter: </label>
          <input
            type="text"
            className="form-control"
            id="price-upper-search"
            onChange={handleUpperInput}
          ></input>
          <div id="upper-price-invalid" className="text-danger invisible">
            Please provide a number
          </div>
        </div>

        <div className="form-group col-12">
          <label htmlFor="name-search">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name-search"
            onChange={handleTermInput}
          ></input>
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>

      <div className="container mb-4">
        <div className="row d-flex justify-content-center">
          {!loading &&
            hasBeenSubmited &&
            finalProducts.map((product) => (
              <StockCard
                image_url={product.image_url}
                item_name={product.product_name}
                item_price={product.price}
                item_id={product.id}
                key={product.id}
                onClick={() => openGuestModal(product.id)}
              />
            ))}
        </div>
      </div>
    </>
  );
}
