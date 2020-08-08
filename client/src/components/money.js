import React, { useState, useEffect } from "react";
import walletService from "../Services/walletService";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

//to style the avatar
//=============================================
const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    alignSelf: "center",
    width: "70px",
    height: " 70px",
    color: "FFFFFF",
    backgroundColor: "#77C3EC",
    fontSize: "20px",
  },
}));

//================================================

//To display the amount of money you have in your Wallet Page functionality
//=====================================================
const Money = (props) => {
  const [user, setUser] = useState({ wallet: 0 });

  //declairing the styling class
  const classes = useStyles();

  //to set user
  useEffect(() => {
    walletService.getWallet().then((data) => {
      if (user.wallet === "" || user.wallet === 0) {
        setUser({ wallet: data.wallet });
      } else setUser({ wallet: data.wallet * 1 });
    });
  }, [props]);

  console.log(props);

  return (
    <>
      <Avatar className={classes.avatar}>
        <small>{user.wallet} $</small>
      </Avatar>
    </>
  );
};

export default Money;
