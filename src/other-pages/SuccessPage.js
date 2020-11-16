import React from "react";
import { Link, useHistory } from "react-router-dom";

// semi-reusable page parameter meant to check what action the admin did
export default function SuccessPage({ actionSuccessful }) {
  const history = useHistory();
  if (actionSuccessful === "update") {
    document.title = "Successful Update";
  } else if (actionSuccessful === "delete") {
    document.title = "Successful Delete";
  }

  // if the admin performed a succesful update
  // display that the update was successful
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
          OR
          <button className="btn btn-link">
            <Link to="/admin-dashboard" className="custom-link">
              Click here to go to the dashboard
            </Link>
          </button>
        </div>
      </>
    );
  } else if (actionSuccessful === "delete") {
    // if the admin performed a succsful delte
    // display that the delete was successful
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
          OR
          <button className="btn btn-link">
            <Link to="/admin-dashboard" className="custom-link">
              Click here to go to the dashboard
            </Link>
          </button>
        </div>
      </>
    );
  } else {
    // if for whatever reason something else was passed in,
    // push into wildcard or error page
    history.push(`error`);
  }
}
