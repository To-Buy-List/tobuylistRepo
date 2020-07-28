import React, { useState, useContext, useEffect } from "react";
import walletService from "../Services/walletService";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";
import Money from "./money";
import { Link } from "react-router-dom";

var Wallet = (props) => {
  const [wallet, setWallet] = useState({
    id: "",
    money: "",
  });

  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();
    walletService.postWallet(wallet).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        alert("Money Added");
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
    setWallet({ [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setWallet({
      money: "",
    });
  };

  const deleteWalletHandler = (id) => {
    walletService.deleteWallet(id).then((data) => {
      const { message } = data;
      if (!message.msgError) {
        console.log("deleted");
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

  const idCatch = (id) => {
    setWallet({ id: id });
  };

  return (
    <>
      <div>
        <Money idCatch={idCatch} />
        <form onSubmit={onSubmit}>
          <div>
            <label>Money : </label>
            <input
              type="text"
              onChange={onChange}
              placeholder="Enter amount of money you have"
              name="money"
              value={wallet.money}
            />
          </div>

          <div>
            <button type="submit">Update</button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => deleteWalletHandler(wallet.id)}
            >
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
