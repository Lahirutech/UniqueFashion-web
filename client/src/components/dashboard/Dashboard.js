import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { logoutUser } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };
  const { user } = auth;
  console.log(user)
  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Hey there,</b> {user.name.split(" ")[0]}
            <p className="flow-text grey-text text-darken-1">
              You are logged into a full-stack{" "}
              <span style={{ fontFamily: "monospace" }}>MERN lanka</span> app 👏
            </p>
          </h4>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            onClick={onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
