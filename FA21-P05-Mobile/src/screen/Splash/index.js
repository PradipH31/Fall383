import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppStatusBar from "../../components/StatusBar";
import Colors from "../theme/Colors";

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Startup");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <AppStatusBar backgroundColor={Colors.primary} barStyle="dark-content" />
      <Image
        source={require("../../../assets/splash_ios.png")}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default Splash;
