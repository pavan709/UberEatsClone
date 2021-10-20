import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

let TouchableCmp = TouchableOpacity;
if (Platform.OS === "android" && Platform.Version >= 22)
  TouchableCmp = TouchableNativeFeedback;

const SearchBar = (props) => {
  const [place, setPlace] = useState("New York");
  const [isFocus, setIsFocus] = useState(false);
  const [allPlaces, setAllPlaces] = useState([]);
  const placeChangeHandler = (text) => {
    setIsFocus(true);
    setPlace(text);
  };
  useEffect(() => {
    var requestOptions = {
      method: "GET",
    };
    if (isFocus) {
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${place}&apiKey=a778850b56724887a33050a6d9d64a76`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setAllPlaces(
            result.features.map((item) => item.properties.address_line1)
          );
        })
        .catch((error) => console.log("error", error));
    }
  }, [place, isFocus]);
  // useEffect(()=>{
  //   console.log(allPlaces);
  // },[allPlaces])
  return (
    <View style={styles.screen}>
      <View style={styles.searchBar}>
        <View style={{ marginLeft: 10 }}>
          <Ionicons name="location-sharp" size={24} />
        </View>
        <TextInput
          onChangeText={placeChangeHandler}
          style={styles.text}
          value={place}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        <View style={styles.rightButton}>
          <TouchableCmp
            background={TouchableNativeFeedback.Ripple("#eee", true)}
            onPress={() => {
              setIsFocus(false);
              props.setPlace(place.split(",")[0]);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                padding: 9,
              }}
            >
              <AntDesign
                name="clockcircle"
                size={11}
                style={{ marginRight: 6, alignSelf: "center" }}
              />
              <Text style={{ fontFamily: "open-sans" }}>search</Text>
            </View>
          </TouchableCmp>
        </View>
      </View>
      <View>
        {isFocus &&
          allPlaces &&
          allPlaces.map((item, index) => (
            <View
              key={index}
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "#eee",
              }}
            >
              <TouchableCmp
                onPress={() => {
                  setIsFocus(false);
                  setPlace(item);
                }}
              >
                <View style={{ paddingVertical: 15 }}>
                  <Text style={{ marginHorizontal: 10,fontFamily:'open-sans-medium' }}>{item}</Text>
                </View>
              </TouchableCmp>
            </View>
          ))}
      </View>
    </View>

    // <View style={styles.screen}>
    //   <GooglePlacesAutocomplete
    //   onFail={error => console.error(error)}
    //     query={{key:"AIzaSyBBgtr5afXl4v0rq5lQ9BetDDWLiwx0Zos"}}
    //     onPress={(data) => {
    //       console.log(data.description);
    //     }}
    //     placeholder="search"
    //     styles={{
    //       textInput: {
    //         backgroundColor: "#eee",
    //         borderRadius: 20,
    //         fontWeight: "700",
    //         fontFamily: "open-sans-bold",
    //         marginTop: 7,
    //       },
    //       textInputContainer: {
    //         backgroundColor: "#eee",
    //         borderRadius: 50,
    //         flexDirection: "row",
    //         alignItems: "center",
    //         marginRight: 10,
    //       },
    //     }}
    //     renderLeftButton={() => (
    //       <View style={{ marginLeft: 10 }}>
    //         <Ionicons name="location-sharp" size={24} />
    //       </View>
    //     )}
    //     renderRightButton={() => (
    // <View style={styles.rightButton}>
    //   <AntDesign
    //     name="clockcircle"
    //     size={11}
    //     style={{ marginRight: 6 }}
    //   />
    //   <Text style={{ fontFamily: "open-sans" }}>search</Text>
    // </View>
    //     )}
    //   />
    // </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  screen: {
    marginTop: 15,
    // height: 500,
    width: "100%",
    marginRight: 10,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    height: 50,
    width: 380,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginHorizontal: 10,
    width: "63%",
  },
  rightButton: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "white",
    borderRadius: 30,
  },
});
