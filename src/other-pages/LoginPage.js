import React from "react";

export default function LoginPage() {

  document.title = "Login Page";

  return (
    <>
      <h3 className="text-center mt-3">Inventory Dashboard</h3>
      <hr className="brown-hr"></hr>
      <p>Only administrators can login to this page. Upon failure you will be redirected to the about page</p>
      <p>For grading purposes: </p>
      <p className="text-success">Login: administrator</p>
      <p className="text-success">Password: password</p>
      <form className="mb-4">
        <div className="form-group">
          <label htmlFor="login-username">Login:</label>
          <input
            type="text"
            className="form-control"
            id="login-username"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="login-password"
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </>
  );
}
