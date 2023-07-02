// Screen that Lets you sign in anaoymously using react native firebase auth

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import { signInAnonymously } from "../../services/auth";
import { createUser } from "../../services/userService";

export default function SignInScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await signInAnonymously();

      createUser({ uid: response.user.uid });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading)
    return (
      <View>
        <Text>Loading</Text>
        <ActivityIndicator />
      </View>
    );

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={handleSignIn}
        style={{ marginBottom: 10 }}
      >
        Sign In Anonymously
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
