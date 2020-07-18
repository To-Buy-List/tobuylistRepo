import React, { Component } from "react";
import "./style.css";
import Nav from "./components/navBar";
import List from "./components/list";
import AddItem from "./components/addItem";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route path="/" exact component={Home} />
          <Route path="/addItem" component={AddItem} />
          <Route path="/list" component={List} />
        </div>
      </Router>
    );
  }
}

var Home = () => {
  return (
    <div>
      <br /> <br />
      <label>Enter Your UserName : </label>
      <input
        type="text"
        // onChange={onChange}
        placeholder="Enter your name"
        // value={user.username}
      />
      <br /> <br />
      <label>$ In Your Wallet : </label>
      <input
        type="text"
        // onChange={onChange}
        placeholder="$ in your wallet"
        // value={user.wallet}
      />
    </div>
  );
};

export default App;
