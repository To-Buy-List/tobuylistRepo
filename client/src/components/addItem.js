import React, { useState, useContext } from "react";
import ItemService from "../Services/ItemService";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "../images/logo1.png";
import Avatar from "@material-ui/core/Avatar";

//to style the page
//=============================================
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
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
}));
//================================================

//Add Item Functionalities
//===================================================================
const AddItem = (props) => {
  const [item, setItem] = useState({
    item: "",
    price: "",
    reminder: "",
    bought: false,
  });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  //to update item
  const onSubmit = (e) => {
    e.preventDefault();
    const d = Date.parse(item.reminder);
    const start = Date.now();
    if (d - start <= 0) {
      alert("We can't go Back in time .. change reminder!!");
    } else {
      ItemService.postItem(item).then((data) => {
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
    }
  };

  // to update item state
  const onChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
      bought: false,
    });
  };

  //to reset for when you add
  const resetForm = () => {
    setItem({
      item: "",
      price: "",
      reminder: "",
    });
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
              <img width="50px" height="50px" src={Logo} />
            </Avatar>
          </Link>
          <Typography component="h1" variant="h5">
            Add Item
          </Typography>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            <br />
            <br />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="item"
              label="Enter Item"
              autoFocus
              name="item"
              value={item.item}
              onChange={onChange}
            />
            <TextField
              type="number"
              min="0"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="price"
              label="Enter Price"
              autoFocus
              name="price"
              value={item.price}
              onChange={onChange}
            />
            <br /> <br />
            <Typography component="h6" variant="subtitle2">
              Set a reminder to buy this Item?
            </Typography>
            <TextField
              type="datetime-local"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="reminder"
              autoFocus
              name="reminder"
              value={item.reminder}
              onChange={onChange}
            />
            <br /> <br />
            <div className={classes.root}>
              <ButtonGroup
                orientation="vertical"
                color="primary"
                aria-label="vertical contained primary button group"
                variant="text"
              >
                <Button type="submit">
                  <b>Add</b>
                </Button>
                <Link to="/list" style={{ textDecoration: "none" }}>
                  <Button>
                    <b> my List</b>
                  </Button>
                </Link>
              </ButtonGroup>
            </div>
          </form>
        </div>
      </Container>
      {message ? <Message message={message} /> : null}
    </>
  );
};

export default AddItem;
