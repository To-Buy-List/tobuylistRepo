import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    var navStyle = {
      color: "white",
    };
    return (
      <nav>
        <ul className="nav-links">
          <li>Name</li>
          <Link style={navStyle} to="/addItem">
            <li>Add Items</li>
          </Link>
          <Link style={navStyle} to="/list">
            <li>The List</li>
          </Link>
          <li>Balance</li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
