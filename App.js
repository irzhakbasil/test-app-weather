import React, { Component } from "react";
import {
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import * as actions from "./src/store/actions/index";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";

import CurrentWeather from "./src/containers/CurrentWeather";
import BackgroundImage from "./src/containers/BackgroundImage";
import Button from "./src/containers/Button";

class App extends Component {
  state = {
    dataLoading: false,
    accessError: null,
    error: null
  };

  componentDidMount() {
    this.props.onCheckData();
    this.hasLocationPermission();
    this.getLocation();
  }

  hasLocationPermission = async () => {
    if (
      Platform.OS === "ios" ||
      (Platform.OS === "android" && Platform.Version < 23)
    ) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      this.setState({
        accessError: null
      });
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      this.setState({
        accessError: "Aplication need access to geolocation"
      });
      ToastAndroid.show(
        "Location permission denied by user.",
        ToastAndroid.LONG
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        "Location permission revoked by user.",
        ToastAndroid.LONG
      );
    }
    return false;
  };

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) return;

    this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
        position => {
          let location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.setState({
            //location: location,
            loading: false
          });
          this.props.onSetLocation(location);
          this.props.onFetchWeatherData(location);
        },
        error => {
          this.setState({ error: error.message, loading: false });
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 50
        }
      );
    });
  };

  render() {
    const { loading, updatesEnabled, accessError, dataLoading } = this.state;
    const {
      weatherData,
      userPlaces,
      UserLocation,
      fetchWeatherError
    } = this.props;
    return (
      <View style={styles.container}>
        <BackgroundImage />
        <CurrentWeather
          fetchWeatherError={fetchWeatherError}
          dataLoading={dataLoading}
          accessError={this.state.accessError}
          weatherData={weatherData}
          userPlaces={userPlaces}
          UserLocation={UserLocation}
        />
        <Button press={this.getLocation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#8a8afd",
    paddingHorizontal: 12
  },
  header: {},
  result: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    paddingHorizontal: 16
  },
  submit: {
    marginTop: 10,
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 40,
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

const mapStateToProps = state => {
  return {
    UserLocation: state.location,
    weatherData: state.weatherData,
    fetchWeatherError: state.fetchWeatherError,
    userPlaces: state.userPlaces
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetLocation: location => dispatch(actions.setLocation(location)),
    onFetchWeatherData: location =>
      dispatch(
        actions.fetchWeatherData(
          location.lat.toFixed(4),
          location.lng.toFixed(4)
        )
      ),
    onCheckData: () => dispatch(actions.checkUserData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
