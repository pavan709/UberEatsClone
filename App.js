import React,{useState} from "react";
import { StyleSheet, Text, View,StatusBar } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import cartReducer from "./store/reducers/cart";
import authReducer from './store/reducers/auth';
import orderReducer from './store/reducers/orders';
import { createStore, combineReducers,applyMiddleware } from "redux";
import {Provider as ReduxProvider} from 'react-redux';
import AppNavigator from "./navigation/AppNavigator";
import ReduxThunk from 'redux-thunk';
const rootReducer = combineReducers({
  cart: cartReducer,
  auth:authReducer,
  orders:orderReducer,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),//fontweight :300
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),//fontweight :400
    'open-sans-medium': require('./assets/fonts/OpenSans-Medium.ttf'),//fontweight :500
    'open-sans-semi-bold': require('./assets/fonts/OpenSans-SemiBold.ttf'),//fontweight :600
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),//fontweight :700
    'open-sans-extra-bold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),//fontweight :800
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <ReduxProvider store={store}>
      <AppNavigator />
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
  },
});
