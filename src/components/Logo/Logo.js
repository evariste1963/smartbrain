import React from "react";
import Tilt from "react-parallax-tilt";
import Brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className='ma1 mt0 ml5'>
      <Tilt
        className='Tilt shadow'
        tiltMaxAngleX={30}
        tiltMaxAngleY={30}
        style={{ height: 180, width: 180 }}
      >
        <div className='Tilt-inner pa3'>
          <img
            style={{ paddingTop: "15px", height: 95, width: 95 }}
            alt='logo'
            src={Brain}
          />
          <h3 className='tag'>this.me</h3>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
