import React, { useContext, useState } from "react";
import "./loginForm.css"
import { LoginContext } from "../context/Login";
import { When } from "react-if";

export default function LoginForm(props) {
  const loginContext = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    loginContext.login(username, password);
  };
  const usernameHandler = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  return (
    <>
      <When condition={!loginContext.loggedIn}>
      <form onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Username  </label>
              <input type="text" placeholder="Username" className="form-control mt-1" name="name" required onChange={usernameHandler} />
            </div>
            <br />
            <div className="form-group mt-3">
              <label>Password  </label>
              <input type="password" placeholder="Password" className="form-control mt-1" name="password" required onChange={passwordHandler} />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </When>

    </>
  );
}