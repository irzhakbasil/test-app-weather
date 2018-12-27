import * as actionTypes from "../store/actions/actionTypes";
import { AsyncStorage } from "react-native";

const initialState = {
  location: {
    lat: null,
    lng: null
  },
  userPlaces: [],
  weatherData: null,
  fetchWeatherError: null
};

async function getStorageValue() {
  let response = await AsyncStorage.getItem("userData");
  let data = await JSON.parse(response);
  return data;
}

async function saveToLocal(data) {
  await AsyncStorage.setItem("userData", JSON.stringify(data));
}

const updateUserPlaces = (state, newData) => {
  let updatedData = state.userPlaces.slice();
  updatedData.push(newData);
  saveToLocal(JSON.stringify(updatedData));
  return updatedData;
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_STORED_DATA: {
      return {
        ...state,
        userPlaces: action.payload || []
      };
    }
    case actionTypes.LOCATION_SET:
      return {
        ...state,
        location: action.payload
      };
    case actionTypes.FETCH_WEATHER: {
      return {
        ...state,
        weatherData: action.payload,
        userPlaces: updateUserPlaces(state, action.payload),
        fetchWeatherError: null
      };
    }
    case actionTypes.FETCH_WEATHER_ERROR: {
      return {
        ...state,
        fetchWeatherError: action.payload
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
