import React,{useState} from "react";
import { StyleSheet, Text, View,StatusBar } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import RootNavigation from "./navigation/navigation";
import cartReducer from "./store/reducers/cart";
import { createStore, combineReducers } from "redux";
import {Provider as ReduxProvider} from 'react-redux';

const rootReducer = combineReducers({
  cart: cartReducer,
})

const store = createStore(rootReducer);

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
      <RootNavigation />
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
  },
});
