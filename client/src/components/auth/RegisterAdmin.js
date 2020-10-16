import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

function RegisterAdmin(props) {
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  });
  const [registerForm, setRegForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "admin",
    errors: {},
  });

  const onChange = (e) => {
    const { id, value } = e.target;
    setRegForm({ ...registerForm, [id]: value });
    console.log(registerForm);
  };

  useEffect(() => {
    setRegForm({ ...registerForm, [errors]: registerForm.errors });
  }, [errors]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password,
      password2: registerForm.password2,
      role: registerForm.role,
    };
    console.log(newUser);
    dispatch(registerUser(newUser, props.history));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Register Admin</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={registerForm.name}
                className={classnames("", {
                  invalid: errors.name,
                })}
                id="name"
                type="text"
              />
              <label htmlFor="name">Name</label>
              <span className="red-text">{errors.name}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={registerForm.email}
                className={classnames("", {
                  invalid: errors.email,
                })}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">{errors.email}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={registerForm.password}
                className={classnames("", {
                  invalid: errors.password,
                })}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">{errors.password}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={registerForm.password2}
                className={classnames("", {
                  invalid: errors.password2,
                })}
                id="password2"
                type="password"
              />
              <label htmlFor="password2">Confirm Password</label>
              <span className="red-text">{errors.password2}</span>
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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(RegisterAdmin);
