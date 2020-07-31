import React, { useState, useEffect } from "react";
import walletService from "../Services/walletService";

const Money = (props) => {
  const [user, setUser] = useState({ wallet: "" });

  useEffect(() => {
    walletService.getWallet().then((data) => {
      setUser({ wallet: data.wallet });
    });
  }, [props]);

  if (user.wallet === "0" || user.wallet === {}) {
    return <h3>Add Money to the wallet</h3>;
  } else {
    return <h3>The amount of money You have Is {user.wallet}</h3>;
  }
};

export default Money;
