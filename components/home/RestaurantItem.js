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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
let TouchableCmp = TouchableOpacity;
if (Platform.OS === "android" && Platform.Version >= 22)
  TouchableCmp = TouchableNativeFeedback;




const RestaurantItem = (props) => {
  const {restaurant}=props;

const selectRestaurantHandler = () => {
props.navigation.navigate("RestaurantDetail",{
  name:restaurant.name,
  image:restaurant.image_url,
  price:restaurant.price,
  reviews:restaurant.review_count,
  rating:restaurant.rating,
  categories:restaurant.categories,
});
  }

  return (
    <TouchableCmp activeOpacity={1} onPress={() => selectRestaurantHandler()}>
    <View style={styles.screen}>
      <RestaurantImage image={restaurant.image_url} />
      <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
    </View>
    </TouchableCmp>
  );
};

const RestaurantImage = (props) => (
  
    <View>
      <Image
        source={{
          uri: props.image,
        }}
        style={styles.restaurantImage}
      />
      <View style={styles.heartIcon}>
        <TouchableCmp>
          <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
        </TouchableCmp>
      </View>
    </View>
  
);

const RestaurantInfo = (props) => (
  <View style={styles.restaurantInfo}>
    <View>
      <Text style={{ ...styles.text, fontSize: 15, fontWeight: "bold" }}>
        {props.name}
      </Text>
      <Text style={{ ...styles.text, fontSize: 13, color: "gray" }}>
        30-45 · min
      </Text>
    </View>
    <View style={styles.rating}>
      <Text style={{ ...styles.text }}>{props.rating}</Text>
    </View>
  </View>
);
export default RestaurantItem;

const styles = StyleSheet.create({
  screen: {
    marginTop: 10,
    padding: 15,
    marginBottom: 30,
    backgroundColor: "white",
  },
  restaurantImage: {
    width: "100%",
    height: 180,
  },
  heartIcon: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  restaurantInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontFamily: "open-sans",
  },
  rating: {
    height: 30,
    width: 30,
    backgroundColor: "#eee",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
