import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import Colors from "../../screen/theme/Colors";

const index = ({ itemName, images, deliveryTime, screenWidth, screenHeight, price }) => {
  return (
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
              iconStyle={{ marginTop: 3 }}
            />
            <Text style={styles.priceText}>{price}</Text>
          </View>
          <View style={{ flex: 9, flexDirection: "row" }}>
            <Text style={styles.deliveryTimeText}>{deliveryTime} Mins</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    borderRightColor: Colors.secondary,
    paddingHorizontal: 5,
    borderRightWidth: 1,
  },
  priceText: {
    fontSize: 12,
    fontWeight: "bold",
    paddingTop: 5,
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
