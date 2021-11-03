import React, { useState, useEffect, useRef } from "react";
import AppStatusBar from "../../components/StatusBar/index";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import logo1 from "../../../assets/logo1.png";
import Colors from "../theme/Colors";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const Register = () => {
  const navigation = useNavigation();
  const [notVisible, setNotVisible] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [fullName, setFullName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [mobile, setConfirmMobile] = useState();
  const [formattedValue, setFormattedValue] = useState("");

  const signup = (e) => {
    e.preventDefault();
    if (username === undefined || username.length < 10) {
      Alert.alert("Please Enter a Username");
    } else if (password === undefined || password.length < 6) {
      Alert.alert("Please Enter a Valid Password");
    } else {
      Alert.alert("Login Button Triggered.");
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const phoneInput = useRef(phoneInput);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={0}
      // behavior="position"
    >
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <AppStatusBar />
        <View style={styles.innerContainer}>
          <Image source={logo1} style={styles.logo} />
          <Text style={styles.textTitle}>Create Account</Text>
          <View style={styles.formArea}>
            <InputText
              label="Full Name"
              icon="person"
              placeholder="John Doe"
              placeholderTextColor="#b0b0b0"
              name="fullName"
              onChangetext={setFullName}
              value={fullName}
              type="text"
            />
            <InputText
              label="Username"
              icon="person"
              name="username"
              placeholder="foodtogo383"
              placeholderTextColor="#b0b0b0"
              onChangetext={setUsername}
              value={username}
              type="text"
            />
            <InputText
              label="Email"
              icon="mail"
              name="email"
              placeholder="someone@domain.com"
              placeholderTextColor="#b0b0b0"
              onChangetext={setEmail}
              value={email}
              type="text"
            />
            <View style={{ alignContent: "center", alignItems: "center" }}>
              <PhoneInput
                ref={phoneInput}
                defaultValue={mobile}
                defaultCode="US"
                layout="first"
                onChangeText={(text) => {
                  setConfirmMobile(text);
                }}
                onChangeFormattedText={(text) => setFormattedValue(text)}
                withDarkTheme
              />
            </View>
            <InputText
              label="Password"
              icon="lock"
              name="password"
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
            <TouchableOpacity
              style={styles.buttonInput}
              onPress={(e) => signup(e)}
            >
              <Text style={styles.buttonText}>Register</Text>
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
                Already have an account? &nbsp;
              </Text>
              <Text
                style={styles.redirectLink}
                onPress={(e) => {
                  e.preventDefault();
                  navigation.navigate("Login");
                }}
              >
                Login
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
    paddingTop: 30,
    backgroundColor: Colors.white,
  },
  logo: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    alignSelf: "center",
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
  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7CDB8A",
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonText1: {
    color: "white",
    fontSize: 14,
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
export default Register;
