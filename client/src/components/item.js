import React, { useState, useContext } from "react";
import ItemService from "../Services/ItemService";
import { AuthContext } from "../Context/AuthContext";
import walletService from "../Services/walletService";

const Item = (props) => {
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  console.log(props);
  const deleteItemHandler = (id) => {
    ItemService.deleteItem(id).then((data) => {
      const { message } = data;
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

  const boughtItemHandler = () => {};

  return (
    <li>
      {formatItems()}
      <button type="button" onClick={() => deleteItemHandler(props.item._id)}>
        Delete
      </button>
      <button type="button" onClick={() => boughtItemHandler(props.item)}>
        Bought
      </button>
    </li>
  );
};

export default Item;
