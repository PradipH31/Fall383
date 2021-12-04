import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./src/screen/Splash";
import Startup from "./src/screen/Startup";
import Main from "./src/screen/Main";
import Login from "./src/screen/Login";
import Register from "./src/screen/Register";
import Cart from "./src/screen/Cart";

const Stack = createNativeStackNavigator();

export default function App() {
  const StackScreen = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
}
