import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon, withBadge } from "react-native-elements";
import Colors from "../../screen/theme/Colors";
import AppStatusBar from "../StatusBar";

const index = () => {
  const BadgeIcon = withBadge(0)(Icon);
  return (
    <View style={styles.header}>
      <AppStatusBar backgroundColor={Colors.primary} barStyle="dark-content" />

      <View style={styles.headerIcon}>
        <Icon
          type="material-community"
          name="menu"
          color={Colors.white}
          size={27}
        />
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.headerTitle}>FoodToGo</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginRight: 15,
        }}
      >
        <BadgeIcon
          type="material-community"
          name="cart"
          color={Colors.white}
          size={27}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    height: 60,
    justifyContent: "space-between",
  },
  headerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },
  headerTitle: {
    color: Colors.whiteShade,
    fontSize: 23,
    fontWeight: "bold",
  },
});

export default index;
