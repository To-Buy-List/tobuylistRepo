import React from "react";

const Item = (props) => {
  return (
    <li>
      {props.item.item}
      <br />
      Price .. {props.item.price} JD
    </li>
  );
};

export default Item;
