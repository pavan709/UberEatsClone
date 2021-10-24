import React from 'react'
import { Platform,StyleSheet, Text, View,TouchableOpacity,TouchableNativeFeedback } from 'react-native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
let TouchableCmp = TouchableOpacity;
if (Platform.OS === "android" && Platform.Version >= 22)
  TouchableCmp = TouchableNativeFeedback;
const BottomTabs = (props) => {
    return (
        <View style={styles.screen}>
            <Icon icon="home" text="Home" />
            <Icon icon="search" text="Browse" />
            <Icon icon="shopping-bag" text="Grocery" />
            <Icon icon="receipt" text="Orders" onPress={() => props.navigation.navigate('Orders')} />
            <Icon icon="user" text="Account" />
        </View>
    )
}

const Icon = props => (
    <TouchableCmp onPress={props.onPress}>

    <View>
        <FontAwesome5 name={props.icon} size={25} style={{
            marginBottom:3,alignSelf:'center'
        }}/>
        <Text style={{fontFamily:'open-sans'}}>{props.text}</Text>
    </View>
    </TouchableCmp>
)
export default BottomTabs

const styles = StyleSheet.create({
    screen:{
        flexDirection:'row',
        margin:10,
        marginHorizontal:30,
        justifyContent:'space-between',
    }
})
