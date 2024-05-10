import React from "react";
import "./Offers.css";
import exclusiveImage from "../Assets/exclusive_image.png";

const Offers = () => {
  return (
    <div className="offers">
      <div className="offersLeft">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCT</p>
        <button>Check Now</button>
      </div>
      <div className="offersRight">
        <img src={exclusiveImage} alt="" />
      </div>
    </div>
  );
};

export default Offers;
