import React from "react";
import { Image, ScrollView, StyleSheet, Text, View,CheckBox } from "react-native";
import { Divider } from "react-native-elements";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { addToCart } from "../../store/actions/cart";
import { useDispatch,useSelector } from "react-redux";


const MenuItems = (props) => {
  const dispatch = useDispatch();
  const selectedItem = (item,checkboxValue) => {
    
    dispatch(addToCart({...item,restaurantName:props.restaurantName,
    checkboxValue:checkboxValue}));
  }

  const cartItems = useSelector(state => state.cart.selectedItems.items)
  const isFoodInCart = (food,cartItems) => {
    return Boolean(cartItems.find(item => item.title === food.title));
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {props.foods.map((food, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
          {props.hideCheckbox ? <></> :<BouncyCheckbox iconStyle={{borderColor:'lightgray',borderRadius:0}} fillColor="green"
          onPress={(checkboxValue) => selectedItem(food,checkboxValue)}
          isChecked={isFoodInCart(food,cartItems)}/>}

            <FoodInfo food={food} />
            <FoodImage food={food} marginLeft = {props.marginLeft?props.marginLeft:0}/>
          </View>
          <Divider width={0.5} orientation="vertical" style={{marginHorizontal:20}}/>
        </View>
      ))}
    </ScrollView>
  );
};

const FoodInfo = (props) => (
  <View style={styles.foodInfo}>
    <Text style={styles.titleStyle}>{props.food.title}</Text>
    <Text style={styles.textStyle}>{props.food.description}</Text>
    <Text style={styles.textStyle}>{props.food.price}</Text>
  </View>
);

const FoodImage = (props) => (
  <View>
    <Image
      source={{ uri: props.food.image }}
      style={{ width: 100, height: 100, borderRadius: 8,marginLeft:props.marginLeft }}
    />
  </View>
);
export default MenuItems;

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  foodInfo: {
    width: 240,
    justifyContent: "space-evenly",
  },
  titleStyle: {
    fontSize: 19,
    fontFamily: "open-sans-semi-bold",
  },
  textStyle: {
    fontFamily: "open-sans",
  },
});
