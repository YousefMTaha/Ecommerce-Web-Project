import React from "react";
import "./items.css";

const item = (props) => {
  return (
    <div className="Item">
      <img src={props.image} alt="" />
      <p>{props.name}</p>

      <div className="itemPrices">
        <div className="newItemPrices">{props.newPrice}</div>
        <div className="oldItemPrices">{props.oldPrice}</div>
      </div>
    </div>
  );
};

export default item;
