import React, { useState, useContext, useEffect } from "react";
import walletService from "../Services/walletService";

const Money = (props) => {
  const [wallet, setWallet] = useState({});

  useEffect(() => {
    walletService.getWallet().then((data) => {
      if (data.length || data.wallet.length) {
        console.log(data);
        props.idCatch(data.wallet[0]._id);
      }
      setWallet(data.wallet[0]);
    });
  }, []);

  if (!wallet) {
    return <h3>Add Money to the wallet</h3>;
  } else {
    return <h3>The amount of money You have Is {wallet.money}</h3>;
  }
};

export default Money;
