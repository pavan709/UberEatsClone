import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
let TouchableCmp = TouchableOpacity;
if (Platform.OS === "android" && Platform.Version >= 22) {
  TouchableCmp = TouchableNativeFeedback;
}
const HeaderTabs = (props) => {
  return (
    <View style={styles.screen}>
      <HeaderButton
        text="Delivery"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        text="Pickup"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  );
};

const HeaderButton = (props) => {
  return (
    <View
      style={{
        ...styles.headerButton,
        backgroundColor: props.text === props.activeTab ? "black" : "white",
      }}
    >
      <TouchableCmp onPress={() => props.setActiveTab(props.text)}>
        <Text
          style={{
            ...styles.text,
            color: props.text === props.activeTab ? "white" : "black",
          }}
        >
          {props.text}
        </Text>
      </TouchableCmp>
    </View>
  );
};
export default HeaderTabs;

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    justifyContent: "center",
    
  },
  headerButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  text: {
    fontSize: 16,
    fontFamily: "open-sans-bold",
  },
});
