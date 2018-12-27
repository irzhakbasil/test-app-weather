import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator
} from "react-native";

class CurrentWeather extends Component {
  render() {
    const {
      weatherData,
      userPlaces,
      location,
      accessError,
      fetchWeatherError
    } = this.props;
    let currentWeather = <ActivityIndicator size="large" color="#fff" />;
    if (weatherData)
      currentWeather = (
        <Text style={styles.text}>
          Temperature: {weatherData.tem}°C / Humidity: {weatherData.humidity}%
          Time: {weatherData.time}
        </Text>
      );
    if (fetchWeatherError)
      currentWeather = (
        <Text style={styles.error}>{fetchWeatherError.message}</Text>
      );

    let mapPlaces = null;
    if (userPlaces || userPlaces.length > 0)
      mapPlaces = userPlaces.map((place, index) => {
        return (
          <View key={index}>
            <Text style={styles.listItem}>
              temp: {place.tem}C / hum %: {place.humidity} / time: {place.time}
            </Text>
          </View>
        );
      });
    return (
      <View>
        <Text style={styles.header}>Weather at your location</Text>
        <Text>{accessError}</Text>
        <View style={styles.placesContainer}>
          <ScrollView>{mapPlaces}</ScrollView>
        </View>

        <View style={styles.cerrentWeather}>{currentWeather}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cerrentWeather: {
    alignSelf: "center",
    width: 350,
    height: 89,
    paddingTop: 18,
    paddingRight: 25,
    paddingLeft: 25,
    paddingBottom: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  text: {
    justifyContent: "center",
    fontSize: 19,
    color: "#fff",
    textAlign: "center"
  },
  listItem: {
    color: "#154607",
    fontSize: 18
  },
  placesContainer: {
    alignSelf: "center",
    height: 450,
    marginBottom: 30
  },
  header: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 32,
    color: "#fff",
    marginBottom: 30
  },
  error: {
    paddingTop: 5,
    color: "#a32828",
    alignSelf: "center",
    fontSize: 25
  }
});

export default CurrentWeather;
