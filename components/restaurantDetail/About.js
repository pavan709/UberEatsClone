import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

// const yelpRestaurantInfo = {
//   name: "Farmhouse Kitchen Thai Cuisine",
//   image:
//     "https://image.shutterstock.com/image-photo/blur-coffee-shop-cafe-restaurant-600w-364151948.jpg",
//   price: "$$",
//   reviews: "1500",
//   rating: 4.5,
//   categories: [{ title: "tHAI" }, { title: "Comfort Food" }],
// };

const About = (props) => {
  const { name, image, price, reviews, rating, categories } =
    props.route.params;
  const formattedCategories = categories.map((cat) => cat.title).join(" · ");
  const description = `${formattedCategories} ${
    price ? " · " + price : ""
  } · ${rating}⭐(${reviews})`;
  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDescription description={description} />
    </View>
  );
};

const RestaurantImage = (props) => {
  return <Image source={{ uri: props.image }} style={styles.image} />;
};

const RestaurantName = (props) => <Text style={styles.name}>{props.name}</Text>;

const RestaurantDescription = (props) => (
  <Text style={styles.description}>{props.description}</Text>
);
export default About;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 180,
  },
  name: {
    fontFamily: "open-sans-semi-bold",
    fontSize: 29,
    marginTop: 10,
    marginHorizontal: 15,
  },
  description: {
    fontFamily: "open-sans",
    marginTop: 10,
    marginHorizontal: 15,
    fontSize: 15.5,
  },
});
