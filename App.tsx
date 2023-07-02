import React from "react";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserProvider from "./src/context/userContext";

import RootNavigation from "./src/navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <UserProvider>
          <RootNavigation />
        </UserProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
