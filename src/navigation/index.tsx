import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ChatScreen,
  HomeScreen,
  RecentChatScreen,
  SignInScreen,
} from "../screens/";
import { useUserContext } from "../context/userContext";
import { Button } from "react-native-paper";
import { signOut } from "../services/auth";

export default function RootNavigation() {
  const { user } = useUserContext();
  console.log(user);

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      {/* <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} /> */}
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => <Button onPress={signOut}>Logout</Button>,
        }}
      />
      <Stack.Screen name="RecentChats" component={RecentChatScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};
//
// Path: src/screens/HomeScreen.tsx
