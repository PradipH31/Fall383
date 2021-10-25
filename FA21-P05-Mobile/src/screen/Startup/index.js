import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Slider1 from "../../assets/images/easy2order.jpg";
import Slider2 from "../../assets/images/fasthomedelivery.jpg";
import Slider3 from "../../assets/images/quality.png";
import Colors from "../../screen/theme/Colors";
// import Fonts from "../../theme/Fonts";
import AppStatusBar from "../../components/StatusBar";
import { useNavigation } from "@react-navigation/native";

const slides = [
  {
    id: 1,
    title: "Easy to Order",
    text: "The Food of your Choice",
    image: Slider1,
  },
  {
    id: 2,
    title: "Fastest Delivery",
    text: "Good Food within Minutes",
    image: Slider2,
  },
  {
    id: 3,
    title: "Best Quality",
    text: "Best Service to fulfil your expectations",
    image: Slider3,
  },
];

function Startup() {
  const navigation = useNavigation();
  const _onDone = () => {
    navigation.replace("Login");
  };

  // const _renderItem = ({ item }) => {
  //   return (
  //     <View style={styles.slide}>
  //       <Image source={item.image} style={styles.imageStyle} />
  //       <Text style={styles.title}>{item.title}</Text>
  //       <Text style={styles.desc}>{item.text}</Text>
  //     </View>
  //   );
  // };

  const _nextbutton = () => {
    return (
      <View style={styles.button}>
        <Text style={styles.next}>Next</Text>
      </View>
    );
  };
  const _doneButton = () => {
    return (
      <View style={styles.button}>
        <Text style={styles.done}>Done</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppStatusBar />
      <AppIntroSlider
        renderItem={({ item, index }) => (
          <View style={styles.slide} key={index}>
            <Image source={item.image} style={styles.imageStyle} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        data={slides}
        onDone={_onDone}
        bottomButton
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        renderNextButton={_nextbutton}
        renderDoneButton={_doneButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  dotStyle: {
    backgroundColor: Colors.secondary,
  },

  activeDotStyle: {
    backgroundColor: Colors.primary,
    width: 25,
  },
  slide: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70,
  },
  imageStyle: {
    height: "60%",
    width: "100%",
    resizeMode: "contain",
  },
  title: {
    fontWeight: "900",
    fontSize: 30,
    color: Colors.primary,
  },

  desc: {
    fontSize: 16,
    color: Colors.secondary,
    textAlign: "center",
    padding: 10,
  },
  button: {
    width: 150,
    backgroundColor: Colors.primary,
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 50,
    alignSelf: "center",
  },
  next: {
    alignSelf: "center",
    color: Colors.white,
    fontSize: 16,
  },
  done: {
    alignSelf: "center",
    color: Colors.white,
    // fontFamily: "Helvetica",
    fontSize: 16,
  },
});

export default Startup;
