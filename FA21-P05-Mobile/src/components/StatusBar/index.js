import React from "react";
import { StatusBar } from "react-native";
import Colors from "../../screen/theme/Colors";

const AppStatusBar = (props) => {
  return (
    <StatusBar
      backgroundColor={
        props.backgroundColor ? props.backgroundColor : Colors.primary
      }
      barStyle="dark-content"
      translucent={props.translucent ? true : false}
    ></StatusBar>
  );
};

export default AppStatusBar;
