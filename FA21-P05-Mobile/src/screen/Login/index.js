import React, { useState, useEffect } from "react";
import AppStatusBar from "../../components/StatusBar/index";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Logo from "../../components/Logo";
import Colors from "../theme/Colors";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const Login = () => {
  const navigation = useNavigation();
  const [notVisible, setNotVisible] = useState(true);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const signIn = () => {
    // if (username === undefined || username.length < 10) {
    //   Alert.alert("Please Enter a Username");
    // } else if (password === undefined || password.length < 6) {
    //   Alert.alert("Please Enter a Valid Password");
    // } else {
    navigation.navigate("Home");
    //}
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={0}
      // behavior="position"
    >
      <ScrollView bounces={false}>
        <AppStatusBar />
        <View style={styles.innerContainer}>
          <Logo />
          <Text style={styles.textTitle}>LOGIN</Text>

          <View style={styles.formArea}>
            <InputText
              label="Username"
              icon="person"
              placeholder="foodtogo383"
              placeholderTextColor="#b0b0b0"
              onChangetext={setUsername}
              value={username}
              type="text"
            />
            <InputText
              label="Password"
              icon="lock"
              placeholder="* * * * * * * *"
              placeholderTextColor={"#b0b0b0"}
              onChangetext={setPassword}
              value={password}
              type="password"
              secureTextEntry={notVisible}
              isPassword={true}
              notVisible={notVisible}
              setNotVisible={setNotVisible}
            />
            <TouchableOpacity style={styles.buttonInput} onPress={signIn}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                padding: 5,
              }}
            >
              <Text style={styles.redirectText}>
                Don't have an account, yet? &nbsp;
              </Text>
              <Text
                style={styles.redirectLink}
                onPress={() => navigation.navigate("Register")}
              >
                Register
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const InputText = ({
  label,
  icon,
  isPassword,
  notVisible,
  setNotVisible,
  ...props
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <View>
      <View style={styles.leftIcon}>
        <Octicons name={icon} size={25} color={Colors.primary} />
      </View>
      <Text style={styles.inputLabel}> {label} </Text>
      <TextInput
        style={focus ? styles.focusInput : styles.textInput}
        {...props}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => setNotVisible(!notVisible)}
        >
          <Ionicons
            name={notVisible ? "md-eye-off" : "md-eye"}
            size={25}
            color={Colors.secondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 10,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  scrollView: {
    padding: 30,
  },
  textTitle: {
    fontSize: 25,
    textAlign: "center",
    color: Colors.primary,
    fontWeight: "bold",
    marginTop: 10,
    letterSpacing: 2,
    padding: 10,
  },
  subTitle: {
    textAlign: "center",
  },
  formArea: {
    width: "100%",
  },
  textInput: {
    backgroundColor: Colors.whiteShade,
    padding: 15,
    paddingLeft: 55,
    paddingRight: 55,
    borderRadius: 8,
    height: 60,
    marginVertical: 3,
    marginBottom: 10,
    color: Colors.secondary,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1,
  },
  focusInput: {
    backgroundColor: Colors.whiteShade,
    padding: 15,
    paddingLeft: 55,
    paddingRight: 55,
    borderRadius: 16,
    height: 60,
    marginVertical: 3,
    marginBottom: 10,
    color: Colors.secondary,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  inputLabel: {
    color: Colors.secondary,
    fontSize: 14,
    textAlign: "left",
  },
  leftIcon: {
    left: 15,
    top: 35,
    position: "absolute",
    zIndex: 1,
  },
  rightIcon: {
    right: 15,
    top: 35,
    position: "absolute",
    zIndex: 1,
  },
  buttonInput: {
    padding: 15,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: 5,
    height: 60,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  line: {
    alignSelf: "center",
    height: 1,
    width: "90%",
    backgroundColor: Colors.whiteShade,
    marginVertical: 10,
  },
  redirectText: {
    justifyContent: "center",
    alignContent: "center",
    color: Colors.secondary,
    fontSize: 13,
  },
  redirectLink: {
    justifyContent: "center",
    alignItems: "center",
    color: "#e64c00",
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
export default Login;
