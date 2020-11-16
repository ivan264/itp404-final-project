import React from "react";

export default function StockCard({
  image_url,
  item_name,
  item_price,
  item_id,
  onClick,
}) {
  return (
    <>
      <div className="col-3 rounded mt-3 d-flex align-items-stretch">
        <div className="rounded light-blue-card m-2">
          <img
            src={image_url}
            alt={item_name}
            className="resize-image rounded"
            data-testid="Image"
          ></img>
          <div className="mt-2 ml-2 mr-2 text-center">
            <div data-testid="Name">{item_name}</div>
            <hr className="dark-hr mt-1"></hr>
            <div data-testid="Price">Price: ${item_price}</div>
            <button
              className="btn btn-primary mt-2 mb-3 shadow-none"
              onClick={onClick}
            >
              Find out More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
