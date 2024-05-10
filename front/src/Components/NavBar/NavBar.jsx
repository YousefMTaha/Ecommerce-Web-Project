import React, { useState } from "react";
import "./NavBar.css";
import logo from "../Assets/logo.png";
import cartIcon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [Menu, setMenu] = useState("Shop");

  return (
    <div className="navBar">
      <div className="navBar">
        <div className="navLogo">
          <img src={logo} alt="" />
          <p>Ecommerce</p>
        </div>
        <ul className="navMenu">
          <li
            onClick={() => {
              setMenu("Shop");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              Shop
            </Link>
            {Menu === "Shop" ? <hr /> : <></>}
          </li>

          <li
            onClick={() => {
              setMenu("Men");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/Men">
              Men
            </Link>
            {Menu === "Men" ? <hr /> : <></>}
          </li>

          <li
            onClick={() => {
              setMenu("Women");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/Women">
              Women
            </Link>
            {Menu === "Women" ? <hr /> : <></>}
          </li>

          <li
            onClick={() => {
              setMenu("Kids");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/Kids">
              Kids
            </Link>
            {Menu === "Kids" ? <hr /> : <></>}
          </li>
        </ul>

        <div className="navLoginCart">
          <Link to="/Login">
            <button>Login</button>
          </Link>
          <Link to="/Cart">
            <img src={cartIcon} alt="" />
          </Link>
          <div className="navCartCounter">0</div>
        </div>
      </div>
    </div>
  );
};
