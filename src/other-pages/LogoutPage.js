import React from "react";
import { Link } from "react-router-dom";
export default function LogoutPage() {
  document.title = "Logout Page";

  return (
    <>
      <h3 className="text-center mt-3">Logout</h3>
      <hr className="brown-hr"></hr>
      <p className="text-center">Are you really sure you want to logout?</p>
      <div className="row d-flex justify-content-around">
        <button className="btn btn-primary">
          <Link to="/admin-dashboard" className="custom-link">
            No go to the Dashboard
          </Link>
        </button>
        <button className="btn btn-danger">Yes, Im sure</button>
      </div>
    </>
  );
}