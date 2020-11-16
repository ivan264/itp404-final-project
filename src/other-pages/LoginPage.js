import React, { useContext, useEffect, useState } from "react";
import loggedContext from "../loginContext";
import { fetchAdmin } from "../api";
import { PuffLoader } from "react-spinners";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
  const [loading, setLoading] = useState();
  // tracks the admin-login credentials
  const [adminName, setAdminName] = useState();
  const [adminPassword, setAdminPassword] = useState();

  // tracks what the user attempted to enter
  const [nameAttempt, setNameAttempt] = useState("");
  const [passwordAttempt, setPasswordAttempt] = useState("");

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchAdmin()]).then((response) => {
      setAdminName(response[0].admin_name);
      setAdminPassword(response[0].admin_password);
      setLoading(false);
    });
  }, []);

  document.title = "Login Page";

  // get the state function to determine if the credentials are good
  const { setIsAdmin } = useContext(loggedContext);

  function handleLogin() {

    // if the credentials match.. otherwise redirect to about change
    if (adminName === nameAttempt && adminPassword === passwordAttempt) {
      // set the context state as true or rather is an admin
      setIsAdmin(true);
      // push to the admin dashboard
      history.push("/admin-dashboard")
    } else {
      history.push("/about");
    }
  }

  // both of these are onChange functions
  function handlUserName(event) {
    event.preventDefault();
    setNameAttempt(event.target.value);
  }

  function handleUserPassword(event) {
    event.preventDefault();
    setPasswordAttempt(event.target.value);
  }

  return (
    <>
      <h3 className="text-center mt-3">Inventory Dashboard</h3>
      <hr className="brown-hr"></hr>
      <p>
        Only administrators can login to this page. Upon failure you will be
        redirected to the about page 😈
      </p>
      <p>For grading purposes: </p>
      <p className="text-success">Login: administrator</p>
      <p className="text-success">Password: password</p>
      {loading && (
        <>
          <div className="container mb-4 d-flex justify-content-center">
            <div className="row d-flex justify-content-center">
              <div className="col">
                <PuffLoader size="100px" color="#ffffff" loading={loading} />
              </div>
            </div>
          </div>
        </>
      )}
      {!loading && (
        <>
          <form className="mb-4">
            <div className="form-group">
              <label htmlFor="login-username">Login:</label>
              <input
                type="text"
                className="form-control"
                id="login-username"
                onChange={handlUserName}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="login-password"
                onChange={handleUserPassword}
              ></input>
            </div>
          </form>
          <button className="btn btn-primary mb-4" onClick={handleLogin}>
            Login
          </button>{" "}
        </>
      )}
    </>
  );
}
