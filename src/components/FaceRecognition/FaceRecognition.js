import React from "react";
import "./FaceRecognition.css";
/*
faceRecognition 
[]
0: {leftCol: 30.95494, topRow: 21.793498019999998, rightCol: 373.97459, bottomRow: 177.93710478}
1: {leftCol: 370.43068, topRow: 195.83837559, rightCol: 34.56954999999999, bottomRow: 9.361029599999995}
2: {leftCol: 199.745, topRow: 25.15068081, rightCol: 201.19830000000002, bottomRow: 183.46632669}
3: {leftCol: 204.48839999999998, topRow: 194.60243609999998, rightCol: 198.56185, bottomRow: 8.20753092000001}
4: {leftCol: 39.85718, topRow: 200.32815132000002, rightCol: 363.29785000000004, bottomRow: 10.354235399999993}
5: {leftCol: 373.41825, topRow: 15.820887609000001, rightCol: 28.450670000000002, bottomRow: 174.12112125}
length: 6
[[Prototype]]: Array(0)
*/

//forEach as below
//https://discuss.codecademy.com/t/can-i-use-foreach-to-create-a-list-of-jsx-elements/404799
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
