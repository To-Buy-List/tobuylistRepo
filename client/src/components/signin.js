import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import Message from "../components/Message";
import { AuthContext } from "../Context/AuthContext";

const SignIn = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.signin(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        //where to go when you're signedIn
        props.history.push("/");
      } else setMessage(message);
    });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <br /> <br />
          <label id="emLog">Username</label>
          <br /> <br />
          <input
            type="text"
            id="emailLog"
            onChange={onChange}
            placeholder="Enter your username"
            name="username"
          />
        </div>
        <br /> <br />
        <div>
          <label id="pLog">Password</label>
          <br></br>
          <input
            type="password"
            id="passwordLog"
            onChange={onChange}
            placeholder="Enter your password"
            autoComplete="off"
            name="password"
          />
        </div>
        <br /> <br />
        <div>
          <button type="submit">Sign In</button>
          Don't have an account ? <Link to="signup">SignUp</Link>{" "}
        </div>
      </form>
      {message ? <Message message={message} /> : null}
    </>
  );
};

export default SignIn;
