import * as actionTypes from "./actionTypes";
import { AsyncStorage } from "react-native";

const API_KEY = "abf641bfa057d555babb043454129e64";
const RootUrl = "https://api.openweathermap.org/data/2.5/weather?";

const fetchWeatherSuccess = weatherData => ({
  type: actionTypes.FETCH_WEATHER,
  payload: weatherData
});

const fetchWeatherFail = error => ({
  type: actionTypes.FETCH_WEATHER_ERROR,
  payload: error
});

export const fetchWeatherData = (lat, lon) => {
  const url = `${RootUrl}lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return async dispatch => {
    try {
      let response = await fetch(url);
      let json = await response.json();
      const date = new Date().toLocaleDateString();
      const needInformation = {
        tem: (json.main.temp - 273.15).toFixed(0),
        humidity: json.main.humidity,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };
      dispatch(fetchWeatherSuccess(needInformation));
    } catch (error) {
      dispatch(fetchWeatherFail(error));
    }
  };
};

export const setLocation = location => {
  return {
    type: actionTypes.LOCATION_SET,
    payload: location
  };
};

export const setStoredData = data => {
  return {
    type: actionTypes.SET_STORED_DATA,
    payload: data
  };
};

export const checkUserData = () => {
  return async dispatch => {
    try {
      let response = await AsyncStorage.getItem("userData");
      let data = await JSON.parse(response);
      data = JSON.parse(data);
      dispatch(setStoredData(data));
    } catch (error) {
      console.log(error);
    }
  };
};
