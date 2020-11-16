// this function will GET all products
export function fetchProducts() {
  return fetch("/products").then((response) => {
    return response.json();
  });
}

// this function will GET one product with the specified id
export function fetchProduct(id) {
  return fetch(`/products/${id}`).then((response) => {
    // if something went wrong
    if (response.status >= 400) {
      return Promise.reject("There was an error 😢");
    }
    return response.json();
  });
}

// this function will POST a new product to products
// passing in the required parameters of : name,price,current stock, stockwarning,
// image_url, and description
// optional paramter: promotion
// id auto incrememnts
export function addProduct(productObject) {
  return fetch("/products", {
    method: "POST",
    body: JSON.stringify(productObject),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

// this function will PUT an updated product to products
export function updateProduct(id, updatedObject) {
  return fetch(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedObject),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

// this function will DELETE a product
export function deleteProduct(id) {
  return fetch(`/products/${id}`, {
    method: "DELETE",
  });
}

// fetch administrator/login credential
export function fetchAdmin(){
  return fetch("/administrators/1").then((response) => {
    return response.json();
  });
}