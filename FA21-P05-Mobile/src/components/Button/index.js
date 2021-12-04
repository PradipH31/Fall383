import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../screen/theme/Colors";

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.textTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textTitle: { color: Colors.white, fontSize: 16, fontWeight: "bold" },
});

export default Button;
