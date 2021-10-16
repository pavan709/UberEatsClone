import React from "react";

import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import RestaurantItem from './RestaurantItem';
const RestaurantItems = (props) => {
  const {restaurantsData}=props;
  return (
    restaurantsData.map((restaurant, index) => (
    <View key={restaurant.id}><RestaurantItem restaurant={restaurant}/></View>
    ))
    
  );
};

export default RestaurantItems;

const styles = StyleSheet.create({});
