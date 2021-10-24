import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import * as ordersActions from "../store/actions/orders";
import Colors from "../constants/Colors";
const OrdersScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const [error,setError] = useState();

  const fetchOrders = useCallback(async () => {
      setIsLoading(true);
    try{
        await dispatch(ordersActions.fetchOrders()).then(() => {
          setIsLoading(false)
        }).catch(err => {setError(err);setIsLoading(false);});
    }catch(err)
    {
        setError(err);
        setIsLoading(false);
    }
  },[dispatch])
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

//   console.log(orders);

if(error)
{
    return (
        <View><Text>Something went wrong!</Text>
        <Button style={{marginTop:10}} title="Retry" color={Colors.fancy6} onPress={fetchOrders} /></View>
    )
}if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.green1} />
      </View>
    );
  }
  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No orders found, maybe start ordering some meals?</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView>
        <View style={styles.header}><Text style={{fontFamily:'open-sans-bold',fontSize:23,color:'white'}}>Orders</Text></View>
      <FlatList
        data={orders}
        renderItem={(itemData) => (
          <View style={styles.order}>
            <View style={styles.restaurant}>
              <Text style={{ fontFamily: "open-sans-bold", fontSize: 17 }}>
                {itemData.item.restaurantName}
              </Text>
              <Text style={{ fontFamily: "open-sans-bold", fontSize: 17 }}>
                Total: ₹{itemData.item.totalAmount}
              </Text>
            </View>
            {itemData.item.items.map((item, index) => (
              <View style={styles.meals} key={index}>
                <Text style={{ fontFamily: "open-sans", fontSize: 15 }}>
                  {item.title}
                </Text>
                <Text style={{ fontFamily: "open-sans", fontSize: 15 }}>
                  {item.price}
                </Text>
              </View>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  order: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    marginHorizontal: 30,
    marginVertical: 20,
    padding: 20,
  },
  restaurant: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  meals: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  header:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        backgroundColor:Colors.fancy3,
        height:50
  }
});
