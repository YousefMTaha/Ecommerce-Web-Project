import React from "react";
import "./Footer.css";
import footerLogo from "../Assets/logo_big.png";
import instaIcon from "../Assets/instagram_icon.png";
import pintIcon from "../Assets/pintester_icon.png";
import whatsIcon from "../Assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerLogo">
        <img src={footerLogo} alt="" />
        <p>Ecommerce</p>
      </div>
      <ul className="footerLinks">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="footerIcons">
        <div className="footerIconsContainer">
          <img src={instaIcon} alt="" />
        </div>
        <div className="footerIconsContainer">
          <img src={pintIcon} alt="" />
        </div>
        <div className="footerIconsContainer">
          <img src={whatsIcon} alt="" />
        </div>
      </div>
      <div className="footerCopyright">
        <hr />
        <p>Copyright @2024 - All rights Reserverd</p>
      </div>
    </div>
  );
};

export default Footer;
