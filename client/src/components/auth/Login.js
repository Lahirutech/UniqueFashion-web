import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
function Login(props) {
  const [loginForm, setLoginform] = useState({
    email: "",
    password: "",
    errors: {},
  });
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { id, value } = e.target;
    setLoginform({ ...loginForm, [id]: value });
  };

  useEffect(() => {
    setLoginform({ ...loginForm, [errors]: setLoginform.errors });
  }, [errors]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/dashboard");
    } else {
      console.log("User not logged in");
    }
  }, [auth.isAuthenticated]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: loginForm.email,
      password: loginForm.password,
    };
    console.log(userData);
    dispatch(loginUser(userData));
  };
  
  return (
    <div className="container">
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={loginForm.email}
                className={classnames("", {
                  invalid: errors.email,
                })}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={loginForm.password}
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect,
                })}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>{" "}
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
