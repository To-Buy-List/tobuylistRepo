import React, { useState, useContext, useEffect, useRef } from "react";
import ItemService from "../Services/ItemService";
import { AuthContext } from "../Context/AuthContext";
import walletService from "../Services/walletService";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

//to style the page
//=============================================
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  cell: {
    fontSize: "10px",
    height: 10,
    minHeight: 5,
    width: 10,
    minWidth: 10,
  },
}));

//================================================

//Item Functionalities
//==================================================
const Item = (props) => {
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({});

  //to set user info
  useEffect(() => {
    walletService.getWallet().then((data) => {
      setUser(data);
    });
  }, [props]);

  //to delete an item
  const deleteItemHandler = (id) => {
    ItemService.deleteItem(id).then((data) => {
      const { message } = data;
      if (!message.msgError) {
        props.updateItems();
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
  //bought functions
  const formatItems = () => {
    if (props.item.bought === false) {
      return (
        <TableCell>
          {props.item.item}
          <br />
          Price: {props.item.price} JD
          <br />
          <p>
            <small>{formatDate(props.item.reminder)}</small>
          </p>
        </TableCell>
      );
    } else {
      return (
        <TableCell>
          <del>
            {props.item.item}
            <br />
            Price .. {props.item.price} JD
          </del>
        </TableCell>
      );
    }
  };

  //if money you have is less than item price
  const overPriced = () => {
    if (user.wallet - props.item.price < 0) {
      return 0;
    } else {
      return user.wallet - props.item.price;
    }
  };

  //buying item functionalities
  const boughtItemHandler = () => {
    walletService
      .postWallet({
        username: user.username,
        wallet: overPriced(),
      })
      .then((data) => {
        const { message } = data;
        if (!message.msgError) {
          ItemService.postBought(props.item._id);
          clearInterval(handle);
          props.updateItems();
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

  // to change bought btn color if reminder is now

  const handle = (element) => {
    setInterval(() => {
      element.style.backgroundColor = "#F85C4D";
    }, 1000);
  };

  const changeBoughtColor = (item) => {
    if (item.reminder !== "") {
      var start = Date.now();
      var difference = Date.parse(item.reminder) - start;
      if (difference > 0) {
        setTimeout(() => {
          var element = document.getElementById(item._id);
          handle(element);
        }, difference);
      } else if (difference <= 0) {
        setTimeout(() => {
          var element = document.getElementById(item._id);
          handle(element);
        }, 0);
      }
    }
  };

  //to format the date of the reminder and show a text
  const formatDate = (date) => {
    if (date !== "") {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear(),
        hours = "" + d.getHours(),
        minutes = "" + d.getMinutes();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return (
        "Reminder on " +
        [day, month, year].join("/") +
        " at " +
        [hours, minutes].join(":")
      );
    } else {
      return null;
    }
  };

  //declairing the styling class
  const classes = useStyles();
  return (
    <TableRow>
      {formatItems()}
      {changeBoughtColor(props.item)}
      <TableCell className={classes.cell} align="right">
        <IconButton
          onClick={() => deleteItemHandler(props.item._id)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>

      <TableCell className={classes.cell} align="right">
        <Button
          id={props.item._id}
          fullWidth
          variant="contained"
          style={{
            backgroundColor: "#77C3EC",
            color: "#FFFFFF",
          }}
          className={classes.submit}
          onClick={() => boughtItemHandler(props.item)}
          size="small"
          disabled={props.item.bought}
        >
          <b>Bought</b>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Item;
