import React from "react";

export default function AdminCard({
  image_url,
  item_name,
  item_price,
  item_id,
  onClickUpdate,
  onClickDelete,
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
          <div className="mt-2 ml-2 mr-2">
            <div className="text-center" data-testid="Name">
              {item_name}
            </div>
            <hr className="dark-hr mt-1"></hr>
            <div className="text-center" data-testid="Price">
              Price: ${item_price}
            </div>

            <div className="container">
              <div className="row">
                <div className="col">
                  <button
                    className="btn btn-danger mt-2 mb-3"
                    onClick={onClickDelete}
                  >
                    Delete
                  </button>
                </div>

                <button
                  className="btn btn-primary mt-2 mb-3"
                  onClick={onClickUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
