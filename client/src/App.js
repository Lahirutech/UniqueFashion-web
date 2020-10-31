import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import RegisterAdmin from "./components/auth/RegisterAdmin";

import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./components/dashboard/Dashboard";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";

// Product related Components
import AddProduct from "./components/products/AddProduct";
import ViewMyProducts from "./components/products/ViewMyProducts";
import EditProduct from "./components/products/EditProduct";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/register-admin" component={RegisterAdmin} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/viewmyproducts" componen={ViewMyProducts} /> */}

          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />

            <PrivateRoute exact path="/addProduct" component={AddProduct} />
            <PrivateRoute
              exact
              path="/viewmyproducts"
              component={ViewMyProducts}
            />
            <PrivateRoute
              exact
              path="/editProduct/:productId"
              component={EditProduct}
            />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
