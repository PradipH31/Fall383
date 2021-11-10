import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";

import Header from "../../components/Header";
import Colors from "../theme/Colors";
const index = () => {
  const [delivery, setDelivery] = useState(true);
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={styles.sub_header}>
            <TouchableOpacity
              onPress={() => {
                setDelivery(true);
              }}
            >
              <View
                style={{
                  ...styles.buttonDelivery,
                  backgroundColor: delivery
                    ? Colors.primary
                    : Colors.whiteShade,
                }}
              >
                <Text style={styles.textDelivery}> Delivery</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDelivery(false);
              }}
            >
              <View
                style={{
                  ...styles.buttonDelivery,
                  backgroundColor: delivery
                    ? Colors.whiteShade
                    : Colors.primary,
                }}
              >
                <Text style={styles.textDelivery}> Pickup</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 10,
            marginVertical: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#e0e0e0",
              borderRadius: 13,
              paddingVertical: 4,
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
              }}
            >
              <Icon
                type="material-community"
                name="map-marker"
                color={Colors.secondary}
                size={25}
              />
              <Text style={{ marginLeft: 5 }}> 500 W University Ave</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 20,
                marginRight: 20,
                backgroundColor: Colors.white,
                borderRadius: 10,
                paddingHorizontal: 5,
              }}
            >
              <Icon
                type="material-community"
                name="clock-time-nine"
                color={Colors.secondary}
                size={25}
              />
              <Text style={{ marginLeft: 5 }}> Now</Text>
            </View>
          </View>
        </View>
        <View style={styles.textHeaderView}>
          <Text style={styles.textHeader}>Choose Category</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sub_header: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonDelivery: {
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 5,
  },
  textDelivery: {
    marginLeft: 5,
    fontSize: 16,
  },
  textHeader: {
    color: "#424242",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "HelveticaNeue-Medium",
    paddingLeft: 5,
  },
  textHeaderView: {
    backgroundColor: "#e9edf2",
    paddingVertical: 3,
  },
});

export default index;
