import React, { useState, useContext } from "react";
import walletService from "../Services/walletService";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";
import Money from "./money";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "../images/logo1.png";
import Avatar from "@material-ui/core/Avatar";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Alert from "@material-ui/lab/Alert";

//to style the page
//=============================================
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#FFFFFF",
    width: "70px",
    height: " 70px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
//================================================

//Wallet Functionalities
//================================================================
var Wallet = (props) => {
  const [user, setUser] = useState({ username: "", wallet: 0 });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  //to get the user info from Money Props
  const infoCatch = (data) => {
    setUser({ username: data.username });
  };

  //to update wallet
  const onSubmit = (e) => {
    e.preventDefault();
    if (user.wallet !== "" && user.wallet > 0) {
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
    } else {
      alertFunc();
    }
  };

  // to clear the wallet to 0
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

  //alert function
  const alertFunc = () => {
    var element = document.getElementById("redAlert");
    element.hidden = false;
  };

  // to update user state
  const onChange = (e) => {
    setUser({ wallet: e.target.value });
    var element = document.getElementById("redAlert");
    element.hidden = true;
  };

  //to reset for when you update
  const resetForm = () => {
    setUser({
      wallet: 0,
    });
    var element = document.getElementById("redAlert");
    element.hidden = true;
  };

  //declairing the styling class
  const classes = useStyles();

  return (
    <>
      <Container>
        <CssBaseline />
        <div className={classes.paper}>
          <Link to="/">
            <Avatar className={classes.avatar}>
              <img width="50px" height="50px" src={Logo} alt="Logo" />
            </Avatar>
          </Link>
          <Typography component="h1" variant="h5">
            My Wallet
          </Typography>
          <br />
          <br />
          <Money infoCatch={infoCatch} />
          <div id="redAlert" className={classes.alert} hidden>
            <Alert severity="error">Please Add Money to your Wallet!!</Alert>
          </div>
          <br />
          <form onSubmit={onSubmit}>
            <CurrencyTextField
              label="Amount"
              variant="standard"
              currencySymbol="$"
              minimumValue="0"
              outputFormat="string"
              digitGroupSeparator=","
              onChange={onChange}
              name="money"
              value={user.wallet}
            />
            <br />
            <br />
            <ButtonGroup
              size="small"
              orientation="vertical"
              className={classes.root}
              variant="text"
              color="primary"
              aria-label="text primary button group"
            >
              <Button type="submit">
                <b>UPDATE</b>
              </Button>
              <Button onClick={() => clearWalletHandler()}>
                <b>CLEAR</b>
              </Button>
            </ButtonGroup>
            <br /> <br />
            <Link to="/addItem" style={{ textDecoration: "none" }}>
              <Button
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: "#ff8b3d",
                  color: "#FFFFFF",
                }}
                className={classes.submit}
              >
                <b>Add Items </b>
              </Button>
            </Link>
          </form>
        </div>
      </Container>
      {message ? <Message message={message} /> : null}
    </>
  );
};

export default Wallet;
