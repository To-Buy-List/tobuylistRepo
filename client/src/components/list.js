import React, { useState, useEffect } from "react";
import ItemService from "../Services/ItemService";
import Item from "./item";

var List = (props) => {
  const [items, setItems] = useState([]);
  //it needs to be filled

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
    </div>
  );
};

export default List;
