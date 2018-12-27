import { AppRegistry } from "react-native";
import App from "./App";
import React from "react";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./src/store/rootReducer";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(rootReducer);

const RNForecastAppRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent("Example", () => RNForecastAppRedux);
