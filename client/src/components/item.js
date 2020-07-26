import React from "react";

const Item = (props) => {
  const formLi = () => {
    if (!props.item.price) return <li>{props.item.item}</li>;
    else
      return (
        <li>
          {props.item.item}
          <br />
          Price .. {props.item.price} JD
        </li>
      );
  };
  return <div>{formLi()}</div>;
};

export default Item;
