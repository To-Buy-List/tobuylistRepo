import React, { useState, useRef, useEffect } from "react"; //useRef and useEffect will be used for the setTimeOut
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import Message from "../components/Message";
import { AuthContext } from "../Context/AuthContext";

const SignUp = (props) => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState(null);
  var timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ username: "", email: "", password: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.signup(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        //to show the message and go to sign in if there is no error
        timerID = setTimeout(() => {
          props.history.push("/signin");
        }, 2000);
      }
    });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <br /> <br />
          <label>Username</label>
          <br /> <br />
          <input
            type="text"
            onChange={onChange}
            placeholder="Enter your username"
            name="username"
            value={user.username}
          />
        </div>

        <div>
          <label>E-Mail Address</label>
          <br /> <br />
          <input
            type="email"
            onChange={onChange}
            placeholder="Enter your email"
            name="email"
            value={user.email}
          />
        </div>

        <div>
          <label>Password</label>
          <br /> <br />
          <input
            type="password"
            onChange={onChange}
            placeholder="Enter your password"
            name="password"
            value={user.password}
            autoComplete="off"
          />
          <br /> <br />
          <button>Sign Up</button> I'm already member
          <Link to="/signin"> Sign In</Link>
        </div>
      </form>
      {message ? <Message message={message} /> : null}
    </>
  );
};

export default SignUp;
