import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";

import Card from "../../components/Card";

import Header from "../../components/Header";
import { filterTestData, testSpecialsItemsData } from "../../global/testData";
import Colors from "../theme/Colors";

const SCREEN_WIDTH = Dimensions.get("window").width;
const index = () => {
  const [delivery, setDelivery] = useState(true);
  const [indexCheck, setIndexCheck] = useState("0");
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
        <View style={styles.addressContainer}>
          <View style={styles.addressSubContainer}>
            <View style={styles.addressTextView}>
              <Icon
                type="material-community"
                name="map-marker"
                color={Colors.secondary}
                size={25}
              />
              <Text style={{ marginLeft: 5 }}> 500 W University Ave</Text>
            </View>
            <View style={styles.addressTimeView}>
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
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={filterTestData}
            keyExtractor={(item) => item.id}
            extraData={indexCheck}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setIndexCheck(item.id);
                }}
              >
                <View
                  style={
                    indexCheck === item.id
                      ? { ...styles.categorySelected }
                      : { ...styles.categoryContainer }
                  }
                >
                  <Image
                    style={{ height: 50, width: 50, borderRadius: 25 }}
                    source={item.image}
                  />
                  <View>
                    <Text
                      style={
                        indexCheck === item.id
                          ? { ...styles.categoryNameSelected }
                          : { ...styles.categoryName }
                      }
                    >
                      {item.name}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>
        <View style={styles.textHeaderView}>
          <Text style={styles.textHeader}>Specials</Text>
        </View>
        <View>
          <FlatList
            style={{ marginTop: 10, marginBottom: 10 }}
            horizontal={true}
            data={testSpecialsItemsData}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ marginRight: 10 }}>
                <Card
                  screenWidth={SCREEN_WIDTH * 0.6}
                  images={item.images}
                  itemName={item.itemName}
                  price={item.price}
                  deliveryTime={item.deliveryTime}
                />
              </View>
            )}
          />
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
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  addressSubContainer: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    borderRadius: 13,
    paddingVertical: 4,
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  addressTextView: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  addressTimeView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  categoryContainer: {
    borderRadius: 25,
    backgroundColor: Colors.whiteShade,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: 80,
    margin: 10,
    height: 100,
  },
  categorySelected: {
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: 80,
    margin: 10,
    height: 100,
  },
  categoryName: {
    fontWeight: "bold",
    marginTop: 1,
    fontSize: 12,
    color: Colors.primary,
  },
  categoryNameSelected: {
    fontWeight: "bold",
    marginTop: 1,
    fontSize: 12,
    color: Colors.whiteShade,
  },
});

export default index;
