import React, { useState, useContext, useEffect } from "react";
import ItemService from "../Services/ItemService";
import { AuthContext } from "../Context/AuthContext";
import walletService from "../Services/walletService";

const Item = (props) => {
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    walletService.getWallet().then((data) => {
      setUser(data);
    });
  }, [props]);

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
    </li>
  );
};

export default Item;
