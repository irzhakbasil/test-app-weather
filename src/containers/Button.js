import React, { Component } from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";

class Button extends Component {
  render() {
    return (
      <TouchableHighlight
        onPress={() => this.props.press()}
        style={styles.submit}
      >
        <Text style={styles.submitText}>Refresh Location</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  submit: {
    marginTop: 10,
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 40,
    paddingTop: 14,
    paddingRight: 14,
    paddingLeft: 14,
    paddingBottom: 14,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  submitText: {
    fontSize: 19,
    color: "#fff",
    textAlign: "center"
  }
});

export default Button;
