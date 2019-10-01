import React from "react";
import LogoImage from "../assets/Logo.png";
import "../styles/Logo.css";

const Logo = props => {
  return (
    <div className="ui container">
      <img className="ui centered large image" src={LogoImage} />
    </div>
  );
};

export default Logo;
