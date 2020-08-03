import React, { useState, useContext, useEffect } from "react";
import ItemService from "../Services/ItemService";
import { AuthContext } from "../Context/AuthContext";
import walletService from "../Services/walletService";

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
        <>
          {props.item.item}
          <br />
          Price .. {props.item.price} JD
        </>
      );
    } else {
      return (
        <>
          <del>
            {props.item.item}
            <br />
            Price .. {props.item.price} JD
          </del>
        </>
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

  //update time for reminder
  const onChange = (e) => {
    const d = Date.parse(e.target.value);
    const start = Date.now();
    if (d - start <= 0) {
      alert("We can't go Back in time");
    } else {
      props.item.reminder = e.target.value;
    }
    console.log(props.item.reminder);
  };

  //to save reminder date in the database
  const onSubmit = (e) => {
    e.preventDefault();
    ItemService.postReminder(props.item._id, props.item.reminder).then(
      (data) => {
        const { message } = data;
        if (!message.msgError) {
          //we'll hide the div again and re-render elements
          var element = document.getElementById("hiddenDiv");
          element.setAttribute("hidden", true);
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
      }
    );
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
        "You Set a Reminder on " +
        [day, month, year].join("-") +
        " at " +
        [hours, minutes].join(":")
      );
    } else {
      return null;
    }
  };

  // To show Update Reminder Div
  const showUpdateReminderHandler = () => {
    var element = document.getElementById("hiddenDiv");
    element.removeAttribute("hidden");
  };

  return (
    <li>
      {formatItems()}
      <button type="button" onClick={() => deleteItemHandler(props.item._id)}>
        Delete
      </button>
      <button
        disabled={props.item.bought}
        type="button"
        onClick={() => boughtItemHandler(props.item)}
      >
        Bought
      </button>
      <button
        onClick={() => showUpdateReminderHandler()}
        disabled={props.item.bought}
      >
        Update Reminder
      </button>
      <div>
        <p>
          <small>{formatDate(props.item.reminder)}</small>
        </p>
      </div>
      <div id="hiddenDiv" hidden={true}>
        <input type="datetime-local" onChange={onChange} name="date" />
        <button onClick={onSubmit} disabled={props.item.bought}>
          Set Reminder
        </button>
      </div>
    </li>
  );
};

export default Item;
