import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
// import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
const SearchBar = () => {
  // const [place, setPlace] = useState();
  // useEffect(() => {
  //   var requestOptions = {
  //     method: 'GET',
  //   };
    
  //   fetch("https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=a778850b56724887a33050a6d9d64a76", requestOptions)
  //     .then(response => response.json())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }, [place]);

  return (
    <View style={styles.screen}>
      <GooglePlacesAutocomplete
      onFail={error => console.error(error)}
        query={{key:"AIzaSyBBgtr5afXl4v0rq5lQ9BetDDWLiwx0Zos"}}
        onPress={(data) => {
          console.log(data.description);
        }}
        placeholder="search"
        styles={{
          textInput: {
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "700",
            fontFamily: "open-sans-bold",
            marginTop: 7,
          },
          textInputContainer: {
            backgroundColor: "#eee",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          },
        }}
        renderLeftButton={() => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons name="location-sharp" size={24} />
          </View>
        )}
        renderRightButton={() => (
          <View style={styles.rightButton}>
            <AntDesign
              name="clockcircle"
              size={11}
              style={{ marginRight: 6 }}
            />
            <Text style={{ fontFamily: "open-sans" }}>search</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    marginTop: 15,
  },
  rightButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "white",
    padding: 9,
    borderRadius: 30,
  },
});
