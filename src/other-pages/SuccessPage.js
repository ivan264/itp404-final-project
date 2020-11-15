import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function SuccessPage({ actionSuccessful }) {
  const history = useHistory();
  if (actionSuccessful === "update") {
    document.title = "Successful Update";
  } else if (actionSuccessful === "delete") {
    document.title = "Successful Delete";
  }

  if (actionSuccessful === "update") {
    return (
      <>
        <h3 className="text-center mt-3">Update Successful</h3>
        <hr className="brown-hr"></hr>
        <div className="text-center">
          The Item was succesfully updated 😊
          <button className="btn btn-link">
            <Link to="/admin-update-delete" className="custom-link">
              Click here to go to the update or delete page
            </Link>
          </button>
        </div>
      </>
    );
  } else if (actionSuccessful === "delete") {
    return (
      <>
        <h3 className="text-center mt-3">Delete Successful</h3>
        <hr className="brown-hr"></hr>
        <div className="text-center">
          The Item was succesfully deleted 😊
          <button className="btn btn-link">
            <Link to="/admin-update-delete" className="custom-link">
              Click here to go to the update or delete page
            </Link>
          </button>
        </div>
      </>
    );
  } else {
    history.push(`error`);
  }
}
