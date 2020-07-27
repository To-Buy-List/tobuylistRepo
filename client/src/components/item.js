import React, { useState, useContext } from "react";
import ItemService from "../Services/ItemService";
import { AuthContext } from "../Context/AuthContext";

const Item = (props) => {
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const deleteItemHandler = (id) => {
    ItemService.deleteItem(id).then((data) => {
      const { message } = data;
      if (!message.msgError) {
        // ItemService.getItems();
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

  return (
    <li>
      {props.item.item}
      <br />
      Price .. {props.item.price} JD
      <button type="button" onClick={() => deleteItemHandler(props.item._id)}>
        Delete
      </button>
      <button>Bought</button>
    </li>
  );
};

export default Item;
