import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Authservice from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import { useHistory } from "react-router-dom";

var Home = () => {
  let history = useHistory();

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickSignOutHandler = () => {
    Authservice.signout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
        history.push("/signin");
      }
    });
  };

  const unauthenticatedHomePage = () => {
    return (
      <>
        <br />
        <br />
        <Link to="/">
          <button>Home</button>
        </Link>
        <br />
        <br />
        <Link to="/signin">
          <button>Sign in</button>
        </Link>
        <br />
        <br />
        <Link to="/signup">
          <button>Sign up</button>
        </Link>
      </>
    );
  };

  const authenticatedHomePage = () => {
    return (
      <>
        <br />
        <br />
        <Link to="/wallet">
          <button>Wallet</button>
        </Link>
        <br />
        <br />
        <Link to="/addItem">
          <button>Add Items</button>
        </Link>
        <br />
        <br />
        <Link to="/list">
          <button>The List</button>
        </Link>
        <br />
        <br />
        <button type="button" onClick={onClickSignOutHandler}>
          Sign out
        </button>
      </>
    );
  };

  return (
    <div>
      {!isAuthenticated ? unauthenticatedHomePage() : authenticatedHomePage()}
    </div>
  );
};

export default Home;
