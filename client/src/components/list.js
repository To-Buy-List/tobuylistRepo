import React, { useState, useEffect } from "react";
import ItemService from "../Services/ItemService";
import Item from "./item";
import { Link } from "react-router-dom";

var List = (props) => {
  const [items, setItems] = useState([]);

  //equilivant to componentDidMount
  useEffect(() => {
    ItemService.getItems().then((data) => {
      setItems(data.items);
    });
  }, []);

  return (
    <div>
      <ul>
        {items.map((item) => {
          return <Item key={item._id} item={item} />;
        })}
      </ul>
      <button type="button">Clear List</button>
      <br />
      <br />
      <Link to="/">
        <button type="button">Home</button>
      </Link>
    </div>
  );
};

export default List;
