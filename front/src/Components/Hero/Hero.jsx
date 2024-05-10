import React from "react";
import "./Hero.css";
import handIcon from "../Assets/hand_icon.png";
import arrowIcon from "../Assets/arrow.png";
import heroImg from "../Assets/hero_image.png";

const Hero = () => {
  return (
    <div className="Hero">
      <div className="heroLeft">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="handIcon">
            <p>new</p>
            <img src={handIcon} alt="" />
          </div>
          <p>Collections</p>
          <p>For Everyone</p>
        </div>
        <div className="heroLatest">
          <div>Latest Collection</div>
          <img src={arrowIcon} alt="" />
        </div>
      </div>
      <div className="heroRight">
        <img src={heroImg} alt="" />
      </div>
    </div>
  );
};

export default Hero;
