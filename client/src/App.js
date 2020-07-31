import React from "react";
import "./style.css";
import Home from "./components/home";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Nav from "./components/navBar";
import Wallet from "./components/wallet";
import List from "./components/list";
import AddItem from "./components/addItem";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/wallet" component={Wallet} />
        <Route path="/addItem" component={AddItem} />
        <Route path="/list" component={List} />
      </div>
    </Router>
  );
}

export default App;
