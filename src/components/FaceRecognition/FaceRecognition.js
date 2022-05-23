import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  console.log("faceRecognition", box);
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img
          id='inputImage'
          src={imageUrl}
          alt='img'
          width='500px'
          height='auto'
        />
        <div
          className='bounding-Box'
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
