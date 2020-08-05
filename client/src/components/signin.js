import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import Message from "../components/Message";
import { AuthContext } from "../Context/AuthContext";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "../images/logo1.png";
import Avatar from "@material-ui/core/Avatar";
import Alert from "@material-ui/lab/Alert";

//to style the page
//=============================================
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(18),
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
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
//================================================

//Sign in Functionalities
//===================================================================
const SignIn = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  //declairing the styling class
  const classes = useStyles();

  // to update user state
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    var element = document.getElementById("redAlert");
    element.hidden = true;
  };

  //alert function
  const alertFunc = (authenticated) => {
    if (authenticated === false) {
      var element = document.getElementById("redAlert");
      element.hidden = false;
    }
  };

  // to sign in
  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.signin(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        //where to go when you're signedIn
        props.history.push("/");
      } else {
        setMessage(message);
        alertFunc(isAuthenticated);
      }
    });
  };

  return (
    <>
      <Container>
        <CssBaseline />
        <div className={classes.paper}>
          <Link to="/">
            <Avatar className={classes.avatar}>
              <img width="50px" height="50px" src={Logo} />
            </Avatar>
          </Link>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Enter your username"
              autoFocus
              name="username"
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter your password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#77C3EC",
                color: "#FFFFFF",
              }}
              className={classes.submit}
            >
              <b>Sign In</b>
            </Button>

            <Grid item>
              <p>
                Don't have an account? <Link to="signup">{"Sign Up"}</Link>
              </p>
            </Grid>
            <div id="redAlert" className={classes.alert} hidden>
              <Alert severity="error">
                <b>WRONG</b> username or password!!
              </Alert>
            </div>
          </form>
        </div>
      </Container>
      {message ? <Message message={message} /> : null}
    </>
  );
};

export default SignIn;
