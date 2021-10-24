import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Button,
} from "react-native";
import {Divider} from 'react-native-elements'
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "../components/home/Categories";
import HeaderTabs from "../components/home/HeaderTabs";
import RestaurantItem from "../components/home/RestaurantItem";
import SearchBar from "../components/home/SearchBar";
import { getRestaurantsFromYelp } from "../fetchingdata/fetchingRestaurantsData";
import Colors from "../constants/Colors";
import BottomTabs from "../components/home/BottomTabs";
const HomeScreen = (props) => {
  const [restaurantsData, setRestaurantsData] = useState();
  const [error, setError] = useState();
  const [activeTab, setActiveTab] = useState("Delivery");
  const [place,setPlace]=useState('New York');

  const loadRestaurants = useCallback(() => {
    setRestaurantsData(null);
    setError(null);
    getRestaurantsFromYelp(activeTab,place)
      .then((data) => setRestaurantsData(data))
      .catch((e) => setError(e));
  }, [getRestaurantsFromYelp, setRestaurantsData, setError,activeTab,place]);

  useEffect(() => {
    getRestaurantsFromYelp(activeTab,place)
      .then((data) => setRestaurantsData(data))
      .catch((e) => setError(e));
  }, [getRestaurantsFromYelp, setRestaurantsData, setError,activeTab,place]);

  // useEffect(() => {
  //   console.log(error);
  //   console.log("inside home",typeof restaurantsData, restaurantsData);
  // }, [restaurantsData, error]);

  // console.log('typeof',typeof restaurantsData);
  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar setPlace={setPlace}/>
      </View>
 
      {!restaurantsData && !error ? (
        <View style={{ flex: 1 }}>
          <Categories />
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.green1} />
          </View>
        </View>
      ) : restaurantsData ? (
        <FlatList
          data={restaurantsData}
          renderItem={(itemData) => (
            <RestaurantItem restaurant={itemData.item} navigation={props.navigation} />
          )}
          ListHeaderComponent={<Categories />}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Categories />
          <View style={styles.centered}>
            <Text>Something went wrong!</Text>
            <Button style={{marginTop:10}} title="Retry" color={Colors.fancy6} onPress={loadRestaurants} />
          </View>
        </View>
      )}
      <Divider width={1} />
      <BottomTabs navigation={props.navigation} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#eee",
    flex: 1,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
