import React, { Component } from "react";
import Particle from "./components/Particle/Particle";
import Clarifai from "clarifai";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";

//test image: https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s1200d/3_Beautiful-girl-with-a-gentle-smile.jpg
//https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/evolution-faces-631.jpg
//https://cdn.vox-cdn.com/thumbor/CMJs1AJyAmf27RUd2UI5WBSZpy4=/0x0:3049x2048/920x613/filters:focal(1333x1562:1819x2048):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/63058104/fake_ai_faces.0.png
//https://i.cbc.ca/1.5807150.1605732785!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/faces.jpg
//https://content.presspage.com/uploads/1369/1920_stock-photo-mosaic-of-satisfied-people-157248584.jpg
//https://i.dailymail.co.uk/i/pix/2014/06/06/article-2650654-1E86888000000578-350_634x388.jpg
//https://www.photographymad.com/files/images/sprint-start.jpg
//https://www.photographymad.com/files/images/indoor-volleyball.jpg
//https://www.photographymad.com/files/images/speed-skaters.jpg

const app = new Clarifai.App({
  apiKey: "d8a15276d76044ccb4e27a8981a6a548",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "enter an image url",
      imageUrl: "/mo.jpg",
      //"https://content.presspage.com/uploads/1369/1920_stock-photo-mosaic-of-satisfied-people-157248584.jpg",
      boxes: [],
      route: "signin",
      isSignedIn: false,
    };
  }

  calculateFaceLocation = response => {
    const clarifaiFaces = response.outputs[0].data.regions.map(
      region => region.region_info.bounding_box
    ); //returns an array of objects -- bounding_box %'s
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return clarifaiFaces.map(face => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      }; //returns an array of box positions
    });
  };

  displayFaceBox = boxes => {
    this.setState({ boxes: boxes }); //boxes = returned array of boxes above -- sets state.boxes
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch(err => console.log(err));
    document.querySelector("input").value = "";
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route, boxes, imageUrl } = this.state;
    return (
      <div className='App'>
        <Particle />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <div>
              <Logo className='inline' />
              <Rank />
            </div>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
