import React, { useContext } from "react";
import { Link } from "react-router-dom";
import loggedContext from "../loginContext";
import { useHistory } from "react-router-dom";

export default function LogoutPage() {
  const history = useHistory();
  document.title = "Logout Page";
  
  // get the setIsAdmin() function that was passed as context
  const { setIsAdmin } = useContext(loggedContext);
  // if the admin really wants to logout,
  function handleLogout() {
    // setIsAdmin as false (mocks logging out)
    setIsAdmin(false);
    // redirect to about page
    history.push("/about");
  }

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
        <button className="btn btn-danger" onClick={handleLogout}>
          Yes, Im sure
        </button>
      </div>
    </>
  );
}
