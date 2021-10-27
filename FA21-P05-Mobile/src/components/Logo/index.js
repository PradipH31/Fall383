import React from "react";
import { Image, StyleSheet } from "react-native";
import logo from "../../../assets/splash_ios.png";

const Logo = () => {
  return <Image source={logo} style={styles.image_container} />;
};

const styles = StyleSheet.create({
  image_container: {
    height: 275,
    width: 275,
    resizeMode: "contain",
    alignSelf: "center",
  },
});

export default Logo;
