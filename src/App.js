import React, { Component } from "react";
//import Particles from "react-tsparticles";
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
const app = new Clarifai.App({
  apiKey: "d8a15276d76044ccb4e27a8981a6a548",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl:
        "https://content.presspage.com/uploads/1369/1920_stock-photo-mosaic-of-satisfied-people-157248584.jpg",
      box: [],
      route: "signin",
      isSignedIn: false,
    };
  }

  calculateFaceLocation = (response) => {
    let image = document.getElementById("inputImage");
    let width = Number(image.width);
    let height = Number(image.height);
    response.outputs[0].data.regions.forEach((reg, i) => {
      let clarifaiFace = reg.region_info.bounding_box;
      let facebox = {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };

      console.log(facebox);
      this.setState({ box: facebox });
      //this.state.box.push(facebox);
      //return ""; //this.setState({ box: facebox });
      //return this.state.box.push(facebox);
      //return clarifaiFace;
    });
    // console.log(this.state.box);
    //let tsb = this.state.box;
    //if (tsb.length > 0) tsb.forEach((bx) => this.setState({ fb: bx }));
  };

  // displayFaceBox = (faceLoc) => {
  //   this.setState({ box: faceLoc });
  //   console.log(this.state.box);
  // };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ box: [] });
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        console.log(response);
        this.calculateFaceLocation(response);
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route, box, imageUrl } = this.state;
    return (
      <div className="App">
        <Particle />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
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
