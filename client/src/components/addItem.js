import React, { useState, useContext } from "react";
import ItemService from "../Services/ItemService";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";

const AddItem = (props) => {
  const [item, setItem] = useState({
    item: "",
    price: 0,
  });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();
    ItemService.postItem(item).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        alert("Item Added");
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
    setItem({ item: e.target.value, price: e.target.price });
  };

  const resetForm = () => {
    setItem({
      item: "",
      price: 0,
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
            <button type="submit">Add</button>
          </div>
        </form>
        {message ? <Message message={message} /> : null}
      </div>
    </>
  );
};

export default AddItem;
