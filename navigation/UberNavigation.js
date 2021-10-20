import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import RestaurantDetailScreen from "../screens/RestaurantDetailScreen";
import OrderCompletedScreen from "../screens/OrderCompletedScreen";
import AuthScreen from "../screens/AuthScreen";

const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};
export const UberNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
      <Stack.Screen name="OrderCompleted" component={OrderCompletedScreen} />
    </Stack.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={screenOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
      />
    </AuthStackNavigator.Navigator>
  );
};
