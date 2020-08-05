import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import Message from "../components/Message";
import Button from "@material-ui/core/Button";
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
    marginTop: theme.spacing(13),
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

//Sign up Functionalities
//============================================================================
const SignUp = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    wallet: "",
  });
  const [message, setMessage] = useState(null);
  var timerID = useRef(null);

  //declairing the styling class
  const classes = useStyles();

  //useRef and useEffect will be used for the setTimeOut
  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  //To update user state
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    var elementOne = document.getElementById("redAlert");
    elementOne.hidden = true;
    var elementTwo = document.getElementById("blueAlert");
    elementTwo.hidden = true;
  };

  //to reset the form when you submit
  const resetForm = () => {
    setUser({ username: "", email: "", password: "", wallet: "" });
    var elementOne = document.getElementById("redAlert");
    elementOne.hidden = true;
    var elementTwo = document.getElementById("blueAlert");
    elementTwo.hidden = true;
  };

  //alert function
  const alertFunc = (message) => {
    if (message.msgError) {
      var element = document.getElementById("redAlert");
      element.hidden = false;
    } else {
      var element = document.getElementById("blueAlert");
      element.hidden = false;
    }
  };

  //to sign up
  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.signup(user).then((data) => {
      const { message } = data;
      if (message.msgError) {
        alertFunc(message);
      }
      // setMessage(message);
      if (!message.msgError) {
        alertFunc(message.msgError);
        //to show the message and go to sign in if there is no error//
        timerID = setTimeout(() => {
          resetForm();
          props.history.push("/signin");
        }, 2000);
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
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Enter your username"
              autoFocus
              name="username"
              onChange={onChange}
              value={user.username}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your Email"
              autoFocus
              name="email"
              onChange={onChange}
              value={user.email}
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
              value={user.password}
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
              <b>Sign Up</b>
            </Button>

            <Grid item>
              <p>
                Already have an account? <Link to="signin">{"Sign In"}</Link>
              </p>
            </Grid>

            <div id="blueAlert" className={classes.alert} hidden>
              <Alert severity="success" color="info">
                Account Created Succesfully..
              </Alert>
            </div>
            <div id="redAlert" className={classes.alert} hidden>
              <Alert severity="error">Username or email Already Taken!!</Alert>
            </div>
          </form>
        </div>
      </Container>
      {message ? <Message message={message} /> : null}
    </>
  );
};

export default SignUp;
