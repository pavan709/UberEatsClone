import React from "react";
import { StyleSheet, Text, View } from "react-native";

const OrderItem = (props) => {
  const { title, price } = props.item;
  return (
    <View style={styles.order}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-semi-bold",
    fontSize: 16,
  },
  price: { opacity: 0.7, fontSize: 16 },
  order: {
      flexDirection:'row',
      justifyContent:'space-between',
      padding:20,
      borderBottomWidth:1,
      borderBottomColor:'#999',
  },
});
