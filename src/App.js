import React, { Component } from "react";
import Particle from "./components/Particle/Particle";

import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";
import Helper from "./components/Helper/Helper";

//test image: https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s1200d/3_Beautiful-girl-with-a-gentle-smile.jpg
//https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/evolution-faces-631.jpg
//https://cdn.vox-cdn.com/thumbor/CMJs1AJyAmf27RUd2UI5WBSZpy4=/0x0:3049x2048/920x613/filters:focal(1333x1562:1819x2048):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/63058104/fake_ai_faces.0.png
//https://i.cbc.ca/1.5807150.1605732785!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/faces.jpg
//https://content.presspage.com/uploads/1369/1920_stock-photo-mosaic-of-satisfied-people-157248584.jpg
//https://i.dailymail.co.uk/i/pix/2014/06/06/article-2650654-1E86888000000578-350_634x388.jpg
//https://www.photographymad.com/files/images/sprint-start.jpg
//https://www.photographymad.com/files/images/indoor-volleyball.jpg
//https://www.photographymad.com/files/images/speed-skaters.jpg

const initialState = {
  input: "enter an image url",
  imageUrl: "/mo.jpg",
  //"https://content.presspage.com/uploads/1369/1920_stock-photo-mosaic-of-satisfied-people-157248584.jpg",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

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
    fetch("http://localhost:3000/imageUrl", {
      method: "post",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ input: this.state.input }),
    })
      .then(response =>
        response.status === 200 ? response.json() : alert("no image entered")
      )

      .then(response => {
        if (response) {
          const route = "image";
          const method = "put";
          const { id } = this.state.user;
          Helper(route, method, null, null, null, id).then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }));
          });
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
        this.setState({ input: "" });
      })
      .catch(err => {
        this.setState({ imageUrl: "/mo.jpg", boxes: [] });
      });
    document.querySelector("input").value = "";
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
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
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
            </div>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
