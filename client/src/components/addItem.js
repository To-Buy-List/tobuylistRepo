import React, { useState, useContext } from "react";
import ItemService from "../Services/ItemService";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";
import { Link } from "react-router-dom";

const AddItem = (props) => {
  const [item, setItem] = useState({
    item: "",
    price: "",
    reminder: "",
    bought: false,
  });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();
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
  };

  const onChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
      bought: false,
    });
  };

  const resetForm = () => {
    setItem({
      item: "",
      price: "",
      reminder: "",
    });
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label>Item : </label>
            <input
              type="text"
              onChange={onChange}
              placeholder="Enter Item"
              name="item"
              value={item.item}
            />
          </div>
          <div>
            <label>Price : </label>
            <input
              type="text"
              onChange={onChange}
              placeholder="Enter Item Price"
              name="price"
              value={item.price}
            />
          </div>
          <div>
            <p>Would you like to set a reminder to buy this Item?</p>
            <input
              type="datetime-local"
              onChange={onChange}
              name="reminder"
              value={item.reminder}
            />
          </div>
          <br />
          <div>
            <button type="submit">Add</button>
          </div>
          <br /> <br />
          <div>
            <Link to="/">
              <button type="button">Home</button>
            </Link>
            <Link to="/list">
              <button type="button">List</button>
            </Link>
          </div>
        </form>
        {message ? <Message message={message} /> : null}
      </div>
    </>
  );
};

export default AddItem;
