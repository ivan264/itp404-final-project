import React from "react";
import { render } from "@testing-library/react";
import StockCard from "./guest-pages/StockCard";
import AdminCard from "./admin-pages/AdminCard";

// these tests will test my StockCard component i.e.
// the reusable component that displays the information of
// a certain stock to the public. Only the product_name, price, url
// and the id are necessary for the purposes of these tests

const products = [
  {
    id: 1,
    product_name: "Foil Balloons",
    price: 11.99,
    image_url:
      "https://images.unsplash.com/photo-1527540306398-8b8794516f95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1298&q=80",
  },
  {
    id: 2,
    product_name: "Helium Balloons",
    price: 1.99,
    image_url:
      "https://images.unsplash.com/photo-1604080907141-8476a60708dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 3,
    product_name: "Pointy Pinatas",
    price: 12.99,
    image_url:
      "https://images.unsplash.com/photo-1545250888-30e5b5addc36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];

// test #1) Given a singular stock render only 1 stock
test("test StockCard on one object", () => {
  // get only 1 product (e.g. the first 1)
  let product = products[0];

  const { getByTestId } = render(
    <StockCard
      image_url={product.image_url}
      item_name={product.product_name}
      item_price={product.price}
      item_id={product.id}
    />
  );

  // names must match
  expect(getByTestId("Name")).toHaveTextContent("Foil Balloons");

  // must have image src
  expect(getByTestId("Image")).toHaveProperty("src");

  // must have price
  expect(getByTestId("Price")).toHaveTextContent(11.99);
});

// test #2) Given an array of stock's render all those stocks
// because we know that it renders for 1 stock card then we expect
// it to work multiple times
test("given an array of elements, render those as StockCards", () => {
  const { getAllByTestId } = render(
    products.map((product) => (
      <StockCard
        image_url={product.image_url}
        item_name={product.product_name}
        item_price={product.price}
        item_id={product.id}
        key={product.id}
      />
    ))
  );

  // I expect to have 3 Stock cards and therefore all of them to have been set
  expect(getAllByTestId("Name").length).toBe(products.length);
  expect(getAllByTestId("Image").length).toBe(products.length);
  expect(getAllByTestId("Price").length).toBe(products.length);
});

// these tests will test my AdminCard component i.e.
// the reusable component that displays the information of a certain stock
// to the public

// test #3) Given a singular stock render only 1 stock
test("render 1 AdminCard", () => {
  let product = products[0];

  const { getByTestId } = render(
    <AdminCard
      image_url={product.image_url}
      item_name={product.product_name}
      item_price={product.price}
      item_id={product.id}
    />
  );
  // names must match names
  expect(getByTestId("Name")).toHaveTextContent("Foil Balloons");

  // must have image src
  expect(getByTestId("Image")).toHaveProperty("src");

  // must have price match
  expect(getByTestId("Price")).toHaveTextContent(11.99);
});

// test #4) Given multiple stocks render all those stocks
test("given an array of elements, render those as StockCards", () => {
  const { getAllByTestId } = render(
    products.map((product) => (
      <AdminCard
        image_url={product.image_url}
        item_name={product.product_name}
        item_price={product.price}
        item_id={product.id}
        key={product.id}
      />
    ))
  );

  // I expect to have 3 Stock cards and therefore all of them to have been set
  expect(getAllByTestId("Name").length).toBe(products.length);
  expect(getAllByTestId("Image").length).toBe(products.length);
  expect(getAllByTestId("Price").length).toBe(products.length);
});
