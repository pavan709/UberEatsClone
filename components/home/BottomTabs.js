import React from 'react'
import { Platform,StyleSheet, Text, View,TouchableOpacity,TouchableNativeFeedback } from 'react-native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const BottomTabs = () => {
    return (
        <View style={styles.screen}>
            <Icon icon="home" text="Home" />
            <Icon icon="search" text="Browse" />
            <Icon icon="shopping-bag" text="Grocery" />
            <Icon icon="receipt" text="Orders" />
            <Icon icon="user" text="Account" />
        </View>
    )
}

const Icon = props => (
    <TouchableOpacity>

    <View>
        <FontAwesome5 name={props.icon} size={25} style={{
            marginBottom:3,alignSelf:'center'
        }}/>
        <Text style={{fontFamily:'open-sans'}}>{props.text}</Text>
    </View>
    </TouchableOpacity>
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
