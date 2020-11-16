import React from "react";
import { render } from "@testing-library/react";
import { createServer } from "miragejs";
import {
  fetchProducts,
  fetchProduct,
  fetchAdmin,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./api";

// these tests will test out the various funtions of my api
// therfore I have to use miraje

let server;

beforeEach(() => {
  server = createServer({
    routes() {
      // later add namespace this.namespace = ?
      this.logging = false;

      this.delete("/products/1", (schema, request) => {
        return {
          id: 1,
          product_name: "Helium Balloons",
          price: 1.99,
          current_stock: 125,
          stock_warning: 10,
          promotion: "Buy 2 for 1",
          image_url:
            "https://images.unsplash.com/photo-1604080907141-8476a60708dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          description:
            "Sold as pack. 100 in each pack. Sold in single or multiple colors. Mix and Match available",
        };
      });

      this.put("/products/:id", (schema, request) => {
        return Object.assign(JSON.parse(request.requestBody), {
          product_name: "Test Name",
          price: 99.99,
          current_stock: 100,
          stock_warning: 150,
          promotion: "yes",
        });
      });

      this.post("/products", (schema, request) => {
        return Object.assign(JSON.parse(request.requestBody), { id: 2 });
      });

      this.get("/administrators/1", () => {
        return {
          id: 1,
          admin_name: "administrator",
          admin_password: "password",
        };
      });

      this.get("/products/:id", () => {
        return {
          id: 1,
          product_name: "Foil Balloons",
          price: 11.99,
          current_stock: 25,
          stock_warning: 10,
          promotion: null,
          image_url:
            "https://images.unsplash.com/photo-1527540306398-8b8794516f95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1298&q=80",
          description:
            "Sold as single. Size: 10in. Numbers 0-9. Letters: A-Z w/special characters. Available Colors: Red, White, Black, Gold, Blue",
        };
      });

      this.get("/products", () => {
        return [
          {
            id: 1,
            product_name: "Foil Balloons",
            price: 11.99,
            current_stock: 25,
            stock_warning: 10,
            promotion: null,
            image_url:
              "https://images.unsplash.com/photo-1527540306398-8b8794516f95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1298&q=80",
            description:
              "Sold as single. Size: 10in. Numbers 0-9. Letters: A-Z w/special characters. Available Colors: Red, White, Black, Gold, Blue",
          },
          {
            id: 2,
            product_name: "Helium Balloons",
            price: 1.99,
            current_stock: 125,
            stock_warning: 10,
            promotion: "Buy 2 for 1",
            image_url:
              "https://images.unsplash.com/photo-1604080907141-8476a60708dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
            description:
              "Sold as pack. 100 in each pack. Sold in single or multiple colors. Mix and Match available",
          },
        ];
      });
    },
  });
});

afterEach(() => {
  server.shutdown();
});

// test #1) this funciton will test if GET all products
test("test fetchProducts() expect the array to equal", () => {
  return fetchProducts().then((products) => {
    expect(products).toEqual([
      {
        id: 1,
        product_name: "Foil Balloons",
        price: 11.99,
        current_stock: 25,
        stock_warning: 10,
        promotion: null,
        image_url:
          "https://images.unsplash.com/photo-1527540306398-8b8794516f95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1298&q=80",
        description:
          "Sold as single. Size: 10in. Numbers 0-9. Letters: A-Z w/special characters. Available Colors: Red, White, Black, Gold, Blue",
      },
      {
        id: 2,
        product_name: "Helium Balloons",
        price: 1.99,
        current_stock: 125,
        stock_warning: 10,
        promotion: "Buy 2 for 1",
        image_url:
          "https://images.unsplash.com/photo-1604080907141-8476a60708dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description:
          "Sold as pack. 100 in each pack. Sold in single or multiple colors. Mix and Match available",
      },
    ]);
  });
});

// test #2) this funciton will test if GET one product
test("test fetchProducts(1) expect object to equal", () => {
  return fetchProduct(1).then((product) => {
    expect(product).toEqual({
      id: 1,
      product_name: "Foil Balloons",
      price: 11.99,
      current_stock: 25,
      stock_warning: 10,
      promotion: null,
      image_url:
        "https://images.unsplash.com/photo-1527540306398-8b8794516f95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1298&q=80",
      description:
        "Sold as single. Size: 10in. Numbers 0-9. Letters: A-Z w/special characters. Available Colors: Red, White, Black, Gold, Blue",
    });
  });
});

// test #3) this funciton will test if POST a product
test("test addProduct() expect to get the new added product ", () => {
  return addProduct({
    product_name: "Face Masks",
    price: "2.99",
    current_stock: 10,
    stock_warning: 15,
    promotion: null,
    image_url:
      "https://images.unsplash.com/photo-1527540306398-8b8794516f95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1298&q=80",
    description: "this is test",
  }).then((product) => {
    expect(product).toEqual({
      id: 2,
      product_name: "Face Masks",
      price: "2.99",
      current_stock: 10,
      stock_warning: 15,
      promotion: null,
      image_url:
        "https://images.unsplash.com/photo-1527540306398-8b8794516f95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1298&q=80",
      description: "this is test",
    });
  });
});

// test #4) function will test is if PUT a product
test("test updateProduct(1, {OBJECT}) expect to get the updated product", () => {
  return updateProduct(1, {
    id: 1,
    product_name: "Face Masks",
    price: 2.99,
    current_stock: 10,
    stock_warning: 15,
    promotion: null,
    image_url:
      "https://images.unsplash.com/photo-1527540306398-8b8794516f95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1298&q=80",
    description: "this is test",
  }).then((product) => {
    expect(product).toEqual({
      id: 1,
      product_name: "Test Name",
      price: 99.99,
      current_stock: 100,
      stock_warning: 150,
      promotion: "yes",
      image_url:
        "https://images.unsplash.com/photo-1527540306398-8b8794516f95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1298&q=80",
      description: "this is test",
    });
  });
});

// test #5) this function will test if DELETE a product i.e. i expect
// a successful status message
test("test deleteProduct(1) expect to get shorter list of products", () => {
  return deleteProduct(1).then((product) => {
    expect(product.status).toEqual(200);
  });
});

// test #6) this funciton will test if i GET the admins
test("test fetchAdmin() expect object to equal", () => {
  return fetchAdmin().then((product) => {
    expect(product).toEqual({
      id: 1,
      admin_name: "administrator",
      admin_password: "password",
    });
  });
});
