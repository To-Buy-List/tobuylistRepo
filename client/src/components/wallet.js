import React, { useState, useContext } from "react";
import walletService from "../Services/walletService";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";
import Money from "./money";
import { Link } from "react-router-dom";

var Wallet = (props) => {
  const [user, setUser] = useState({ username: "", wallet: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const infoCatch = (data) => {
    setUser({ username: data.username });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    walletService.postWallet(user).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
      } else if (message.msgBody === "UnAuthorized") {
        //this means that the jwt token has expired
        setMessage(message);
        //resetting the user
        authContext.setUser({ username: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  const clearWalletHandler = () => {
    walletService
      .postWallet({ username: user.username, wallet: "0" })
      .then((data) => {
        const { message } = data;
        resetForm();
        if (!message.msgError) {
        } else if (message.msgBody === "UnAuthorized") {
          //this means that the jwt token has expired
          setMessage(message);
          //resetting the user
          authContext.setUser({ username: "" });
          authContext.setIsAuthenticated(false);
        } else {
          setMessage(message);
        }
      });
  };

  const onChange = (e) => {
    setUser({ wallet: e.target.value });
  };

  const resetForm = () => {
    setUser({
      wallet: "",
    });
  };

  return (
    <>
      <div>
        <Money infoCatch={infoCatch} />
        <form onSubmit={onSubmit}>
          <div>
            <label>Money : </label>
            <input
              type="text"
              onChange={onChange}
              placeholder="Enter amount of money you have"
              name="money"
              value={user.wallet}
            />
          </div>

          <div>
            <button type="submit">Update</button>
          </div>
          <div>
            <button type="button" onClick={() => clearWalletHandler()}>
              Clear Wallet
            </button>
          </div>
          <div>
            <Link to="/addItem">
              <button type="button">Next</button>
            </Link>
          </div>
        </form>
        {message ? <Message message={message} /> : null}
      </div>
    </>
  );
};

export default Wallet;
