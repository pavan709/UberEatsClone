import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import About from "../components/restaurantDetail/About";
import MenuItems from "../components/restaurantDetail/MenuItems";
import ViewCart from "../components/restaurantDetail/ViewCart";

const foods = [
  {
    title: "Pav Bhaji",
    description: "Pav Bhaji - a spicy curry of mixed vegetables (bhaji) with Pav (bread)",
    price: "₹50",
    image:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "Idli",
    description: "Idli with coconut chatni",
    price: "₹40",
    image:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZGlhbiUyMGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "Samosa",
    description: "Samosa with mint chatni and sauce",
    price: "₹40",
    image:"https://media.istockphoto.com/photos/samosa-snack-served-with-tomato-ketchup-and-mint-chutney-picture-id980106992?k=20&m=980106992&s=612x612&w=0&h=AL7qpuAuxKTqA8LAR6yTmP_a7GwROzHpZcAc8JNn85Q="
  },
  {
    title: "Dosa",
    description: "Dosa with sambar and chatni",
    price: "₹40",
    image:"https://media.istockphoto.com/photos/dosa-with-sambar-and-chutney-south-indian-breakfast-picture-id518760756?k=20&m=518760756&s=612x612&w=0&h=ys_9MG07_8cdJt_8IWOZPKxyriQ2JCgZS0fvZFQ-4xE="
  },
  {
    title: "Butter Chicken",
    description: "Buter Chicken made with indian spices and butter",
    price: "₹180",
    image:"https://media.istockphoto.com/photos/butter-chicken-spicy-curry-meat-food-in-kadai-dish-on-dark-background-picture-id1127522313?k=20&m=1127522313&s=612x612&w=0&h=lE80-HLKz8vs4dwQqekRgGr39lC0BSE_ovdjmngHZEg="
  },
  {
    title: "Chicken Biriani",
    description: "Chicken Birani made with rice and chicken",
    price: "₹180",
    image:"https://media.istockphoto.com/photos/delicious-homemade-biryani-with-chicken-onion-lemon-spices-and-top-picture-id1052349782?k=20&m=1052349782&s=612x612&w=0&h=lvmnUXIHeLxGsmeF5zZdC0-J-EyXFo6wbFdW2cI-cFA="
  },
  {
    title: "Chilli Chicken",
    description: "Chicken with chill and spices",
    price: "₹180",
    image:"https://media.istockphoto.com/photos/indian-chilli-chicken-dry-served-in-a-plate-over-moody-background-picture-id1072951288?k=20&m=1072951288&s=612x612&w=0&h=6ycUXuafduHKZNdFkEefe2iDJr5KgM24UuY0hSiASpM="
  },
  {
    title: "Indian Thali",
    description: "The perfect indian thali with all items",
    price: "₹180",
    image:"https://media.istockphoto.com/photos/onam-sadya-on-a-banana-leaf-picture-id838927480?k=20&m=838927480&s=612x612&w=0&h=bX7Af14X6DQOXGLo5zrsvG2H5kyMVcHaJnyULIPrCvk="
  },
];

const RestaurantDetailScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <About route={props.route} />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      <MenuItems restaurantName={props.route.params.name} foods={foods} />
      <ViewCart
        navigation={props.navigation}
        restaurantName={props.route.params.name}
      />
    </View>
  );
};

export default RestaurantDetailScreen;

const styles = StyleSheet.create({});
