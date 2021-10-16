import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import RestaurantDetailScreen from "../screens/RestaurantDetailScreen";
import OrderCompletedScreen from "../screens/OrderCompletedScreen";

const RootNavigation = () => {

    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown:false,
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
                <Stack.Screen name="OrderCompleted" component={OrderCompletedScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation;