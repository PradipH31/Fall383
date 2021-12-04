import React from "react";
import Home from "./Home"
import Cart from "./Cart"
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header";

const Main = () => {

    const Stack = createNativeStackNavigator();
    const StackScreen = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="Cart" component={Cart} />
            </Stack.Navigator>
        );
    };

    return (
        <NavigationContainer
            independent={true}
        >
            <Header />
            <StackScreen />
        </NavigationContainer>
    );
};

export default Main;
