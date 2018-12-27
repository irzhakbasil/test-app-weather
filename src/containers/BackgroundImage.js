import React, { Component } from "react";
import { AppRegistry, Image } from "react-native";

const remote = "http://clipart-library.com/images/piodLbz6T.png";

export default class BackgroundImage extends Component {
  render() {
    const resizeMode = "center";

    return (
      <Image
        style={{
          backgroundColor: "#8a8afd",
          flex: 1,
          resizeMode,
          position: "absolute",
          width: "100%",
          height: "100%",
          justifyContent: "center"
        }}
        source={{ uri: remote }}
      />
    );
  }
}

AppRegistry.registerComponent("BackgroundImage", () => BackgroundImage);
