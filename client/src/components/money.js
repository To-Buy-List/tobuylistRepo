import React, { useState, useContext, useEffect } from "react";
import walletService from "../Services/walletService";

const Money = (props) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    walletService.getWallet().then((data) => {
      if (data.data[0].wallet) {
        props = data;
      }
      setUser(data.data[0]);
    });
  }, []);

  if (user.wallet === "0" || user.wallet === {}) {
    return <h3>Add Money to the wallet</h3>;
  } else {
    return <h3>The amount of money You have Is {user.wallet}</h3>;
  }
};

export default Money;
