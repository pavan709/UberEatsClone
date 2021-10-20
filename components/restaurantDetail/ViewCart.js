import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Modal,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import firebase from "../../firebase";
import LottieView from "lottie-react-native";
import * as orderActions from '../../store/actions/orders';
import * as cartActions from '../../store/actions/cart';
let TouchableCmp = TouchableOpacity;
if (Platform.OS === "android" && Platform.Version >= 22)
  TouchableCmp = TouchableNativeFeedback;

const ViewCart = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { items, restaurantName } = useSelector(
    (state) => state.cart.selectedItems
  );
const dispatch = useDispatch();
  // we are removing $ symbol first from string and then accumulation with reduce method
  const total = items
    .map((item) => Number(item.price.replace("₹", "")))
    .reduce((prev, curr) => prev + curr, 0);
  const totalUSD = total.toLocaleString("en-US", {
    style: "currency",
    currency: "IND",
  });

  const addOrderHandler = async () => {
    try{
      await dispatch(orderActions.addOrder(items,total,restaurantName));
      // await dispatch(cartActions.clearCart());
      setLoading(false),
      props.navigation.navigate('OrderCompleted')
    }
    catch(error)
    {
      setError(error);
      setLoading(false);
      setModalVisible(false);
    }
  };

  useEffect(() => {
    if(error)
    {
      Alert.alert('Something went wrong','Check network connection!',[{text:'Okay'}])
    }
  }, [error])

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text>₹{totalUSD}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableCmp onPress={() => {setModalVisible(false); setLoading(true);addOrderHandler();}}>
                <View style={styles.checkout}>
                  <Text style={styles.checkoutText}>Checkout</Text>
                  <Text
                    style={{
                      position: "absolute",
                      right: 20,
                      color: "white",
                      fontSize: 15,
                      fontFamily: "open-sans",
                      top: 17,
                    }}
                  >
                    ₹{totalUSD}
                  </Text>
                </View>
              </TouchableCmp>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        // onRequestClose works for manual back button
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 30,
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableCmp onPress={() => setModalVisible(true)}>
              <View style={styles.button}>
                <Text style={styles.cartText}>View Cart</Text>
                <Text style={styles.cartUSD}>₹{totalUSD}</Text>
              </View>
            </TouchableCmp>
          </View>
        </View>
      ) : (
        <></>
      )}
      {loading ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            opacity: 0.6,
            justifyContent: "center",
            alignItems: "center",
            // flex: 1,
            width:'100%',
            height:'100%',
          }}
        >
          <LottieView
            style={{ height: 200 }}
            source={require("../../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewCart;

const styles = StyleSheet.create({
  cartText: {
    color: "white",
    fontSize: 20,
    fontFamily: "open-sans",
    marginRight: 65,
  },
  button: {
    marginTop: 20,
    backgroundColor: "black",
    alignItems: "center",
    padding: 15,
    borderRadius: 30,
    width: 300,
    position: "relative",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cartUSD: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 20,
  },
  checkout: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 13,
    borderRadius: 30,
    width: 300,
    alignItems: "center",
  },
  checkoutText: {
    color: "white",
    fontSize: 20,
    fontFamily: "open-sans",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
    marginTop: 0,
  },
  modalCheckoutContainer: {
    backgroundColor: "white",
    padding: 16,
    height: 500,
    borderWidth: 1,
  },
  restaurantName: {
    textAlign: "center",
    fontFamily: "open-sans-semi-bold",
    fontSize: 18,
    marginBottom: 10,
  },
  subtotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  subtotalText: {
    textAlign: "left",
    fontFamily: "open-sans-semi-bold",
    fontSize: 15,
    marginBottom: 10,
  },
});
