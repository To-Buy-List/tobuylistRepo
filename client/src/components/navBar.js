import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Authservice from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";

const Nav = (props) => {
  var navStyle = {
    color: "white",
  };

  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickSignOutHandler = () => {
    Authservice.signout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavBar = () => {
    return (
      <>
        <Link style={navStyle} to="/">
          <li>Home</li>
        </Link>
        <Link style={navStyle} to="/signin">
          <li>Sign in</li>
        </Link>
        <Link style={navStyle} to="/signup">
          <li>Sign up</li>
        </Link>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Link style={navStyle} to="/">
          <li>Home</li>
        </Link>
        <Link style={navStyle} to="/wallet">
          <li>Wallet</li>
        </Link>
        <Link style={navStyle} to="/addItem">
          <li>Add Items</li>
        </Link>
        <Link style={navStyle} to="/list">
          <li>The List</li>
        </Link>
        <button type="button" onClick={onClickSignOutHandler}>
          Sign out
        </button>
      </>
    );
  };

  return (
    <nav>
      <ul className="nav-links">
        {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
      </ul>
    </nav>
  );
};

export default Nav;
