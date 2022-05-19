import React from "react";
import Tilt from "react-parallax-tilt";
import Brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt
        className='Tilt br-100
        shadow'
        options={{ max: 55 }}
        style={{ height: 160, width: 160 }}
      >
        <div className='Tilt-inner pa3'>
          <img style={{ paddingTop: "5px" }} alt='logo' src={Brain} />
          <h3 className='tag'>this.me</h3>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
