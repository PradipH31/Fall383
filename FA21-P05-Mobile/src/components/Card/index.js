import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import Colors from "../../screen/theme/Colors";
import Button from "../Button";
import { addItem, removeItem } from "../../global/cart/CartActions"

const AddToCart = ({ item }) => {
  return (
    <Button title='Add To Cart' onPress={() => {
      addItem(item)
      Alert.alert(
        "Added to order",
        "Added " + item.name + " to order",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }} />
  )
}

const RemoveFromCart = ({ item, refresh, setRefresh }) => {
  return (
    <Button title='X' onPress={() => {
      removeItem(item.id, refresh, setRefresh)
    }} />
  )
}

const Quantity = () => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text>1</Text>
    </View>
  )
}

const index = ({
  setRefresh = f => f, refresh = null, itemName, images, screenWidth, screenHeight, price, cart = true, update = false, remove = false, item
}) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          marginBottom: screenHeight / 7
        }}
      >
        <View style={{ ...styles.cardView, width: screenWidth, height: screenHeight }}>
          <Image
            style={{ ...styles.image, width: screenWidth, height: screenHeight }}
            source={{ uri: images }}
          />
        </View>
        <View>
          <View>
            <Text style={styles.specialItemName}>{itemName}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.price}>
              <Icon
                name="currency-usd"
                type="material-community"
                color={Colors.secondary}
                size={18}
                iconStyle={{ marginTop: 10 }}
              />
              <Text style={styles.priceText}>{price}</Text>
            </View>
            <View
              style={{
                flex: 1.4,
                flexDirection: "row",

              }}
            >
              {cart ? <AddToCart item={item} /> : <Quantity />}
            </View>
            {remove ?
              <View
                style={{
                  flex: 1,
                  marginRight: 14,
                }}
              >
                <RemoveFromCart item={item} refresh={refresh} setRefresh={setRefresh} style={{ flex: 1 }} />
              </View> : <Text></Text>
            }
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: 9,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderWidth: 1,
    borderColor: "#bdbdbd",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 150,
  },
  specialItemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3d3939",
    marginTop: 5,
    marginLeft: 10,
  },
  price: {
    flex: 4,
    flexDirection: "row",
    // borderRightColor: Colors.secondary,
    paddingHorizontal: 5,
    // borderRightWidth: 1,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 5,
    marginTop: 5,
    color: Colors.primary,
  },
  deliveryTimeText: {
    fontSize: 12,
    paddingTop: 5,
    color: "#4d4d4d",
    paddingHorizontal: 10,
  },
});

export default index;
