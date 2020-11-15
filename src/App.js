import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import GuestAbout from "./guest-pages/GuestAbout";
import GuestStock from "./guest-pages/GuestStock";
import GuestQuery from "./guest-pages/GuestQuery";
import AdminDashboard from "./admin-pages/AdminDashboard";
import AdminAddStock from "./admin-pages/AdminAddStock";
import AdminUpdateDelete from "./admin-pages/AdminUpdateDelete";

function App() {
  return (
    <Router>
      {/* this is the banner that is shown across all router pages */}
      <div className="container mt-2">
        <div className="jumbotron shadow custom-jumbotron border-bottom border-black">
          <div className="container">
            <h1 className="display-4">Citadel Party Supply Store</h1>
            <p className="lead">
              Your one stop shop for all your party supply needs!
            </p>
          </div>
        </div>
      </div>
      {/* this is the navigation */}
      <div className="container-fluid mb-4">
        <div className="row mr-2 ml-2">
          <div className="col-2 rounded shadow text-center dark-container p-2 test">
            Navigation
            <hr className="brown-hr"></hr>
            <ul className="text-left mt-2">
              <li>
                <NavLink
                  to="/about"
                  className="custom-link"
                  activeClassName="custom-link-active"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/guest-stock"
                  className="custom-link"
                  activeClassName="custom-link-active"
                >
                  View our Current Stock
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/guest-search"
                  className="custom-link"
                  activeClassName="custom-link-active"
                >
                  Looking for something specific?
                </NavLink>
              </li>
            </ul>
            {/* represents the division between authorize/not */}
            <hr className="brown-hr"></hr>
            <ul className="text-left mt-2">
              <li>
                <NavLink
                  to="/admin-dashboard"
                  className="custom-link"
                  activeClassName="custom-link-active"
                >
                  Inventory Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/admin-addstock"
                  className="custom-link"
                  activeClassName="custom-link-active"
                >
                  Add a stock Item
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/admin-update-delete"
                  className="custom-link"
                  activeClassName="custom-link-active"
                >
                  Delete/Update a Stock Item
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col"></div>
          <div className="col-9 shadow rounded dark-container">
            <Switch>
              <Route path="/" exact={true}>
                <Redirect to="/about" />
              </Route>
              <Route path="/about" exact={true}>
                <GuestAbout />
              </Route>
              <Route path="/guest-stock" exact={true}>
                <GuestStock />
              </Route>
              <Route path="/guest-search" exact={true}>
                <GuestQuery />
              </Route>
              {/* here add a boolean to check if the person is an admin */}
              <Route path="/admin-dashboard" exact={true}>
                <AdminDashboard />
              </Route>
              <Route path="/admin-addstock" exact={true}>
                <AdminAddStock />
              </Route>
              <Route path="/admin-update-delete" exact={true}>
                <AdminUpdateDelete />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
