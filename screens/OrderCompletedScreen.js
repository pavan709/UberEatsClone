import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import MenuItems from "../components/restaurantDetail/MenuItems";
import firebase from "../firebase";
import * as orderActions from '../store/actions/orders'
const OrderCompletedScreen = () => {
  const latestOrder = useSelector(state => state.orders.orders[0]);
  // console.log(latestOrder);
  // console.log("in ordercompletedr");
  // const { items, restaurantName } = useSelector(
  //   (state) => state.cart.selectedItems
  // );
  // // we are removing $ symbol first from string and then accumulation with reduce method
  // const total = items
  //   .map((item) => Number(item.price.replace("₹", "")))
  //   .reduce((prev, curr) => prev + curr, 0);
  // const totalUSD = total.toLocaleString("en-US", {
  //   style: "currency",
  //   currency: "IND",
  // });

  // console.log(latestOrder);

  return (
    // <View><Text>asldfhlkasjdf</Text></View>
    <SafeAreaView style={styles.order}>
      <View style={{ margin: 15, alignItems: "center", height: "100%" }}>
        <LottieView
          style={styles.checkMark}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "open-sans-bold",
            marginBottom: 20,
          }}
        >
          Your order at {latestOrder.restaurantName} has been placed for {latestOrder.totalAmount}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MenuItems foods={latestOrder.items} hideCheckbox={true} />
          <LottieView
            style={styles.cooking}
            source={require("../assets/animations/cooking.json")}
            autoPlay
            speed={0.5}
            loop={false}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrderCompletedScreen;

const styles = StyleSheet.create({
  order: {
    flex: 1,
    backgroundColor: "white",
  },
  checkMark: {
    height: 100,
    alignSelf: "center",
    marginBottom: 30,
  },
  cooking: {
    height: 200,
    marginBottom: 20,
    alignSelf: "center",
  },
});
