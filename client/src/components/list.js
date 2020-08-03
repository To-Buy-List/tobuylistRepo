import React, { useState, useEffect } from "react";
import ItemService from "../Services/ItemService";
import Item from "./item";
import { Link } from "react-router-dom";
import Money from "./money";

var List = () => {
  const [items, setItems] = useState([]);

  //equilivant to componentDidMount
  useEffect(() => {
    ItemService.getItems().then((data) => {
      setItems(data.items);
    });
  }, []);

  const updateItems = () => {
    ItemService.getItems().then((data) => {
      setItems(data.items);
    });
  };
  const clearListHandler = () => {
    items.map((item) => {
      return ItemService.deleteItem(item._id);
    });
    updateItems();
  };

  return (
    <div>
      <Money />
      <ul>
        {items.map((item) => {
          return <Item key={item._id} item={item} updateItems={updateItems} />;
        })}
      </ul>
      <button type="button" onClick={() => clearListHandler()}>
        Clear List
      </button>
      <br />
      <br />
      <Link to="/addItem">
        <button type="button">Add Item</button>
      </Link>
      <Link to="/">
        <button type="button">Home</button>
      </Link>
    </div>
  );
};

export default List;
