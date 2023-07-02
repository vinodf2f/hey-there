// React Native screen to login with phoneNumber and OTP, Also option to signup which redirects to signup screen

import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { authenticateUser } from "../../services/auth";


// TODO: implement login with phone number and OTP

export default function LoginScreen({  }) {
  return null
  // const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  // const [showOtp, setShowOtp] = React.useState<boolean>(false);
  // const [showOtpInput, setShowOtpInput] = React.useState<boolean>(false);
  // const [otp, setOtp] = React.useState<string>("");
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // const handleLogin = async () => {
  //   // function to Validate phone number

  //   try {
  //     setIsLoading(true);
  //     const response = await authenticateUser(phoneNumber);
  //     console.log("response", response);
  //     setShowOtpInput(true);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const onSignup = () => {
  //   // Navigate to Signup screen
  //   navigation.navigate("Signup");
  // };

  // return (
  //   <View style={styles.container}>
  //     <TextInput
  //       label="Phone Number"
  //       value={phoneNumber}
  //       onChangeText={(text) => setPhoneNumber(text)}
  //       style={{ marginBottom: 20 }}
  //     />
  //     {showOtpInput && (
  //       <TextInput
  //         label="OTP"
  //         value={otp}
  //         onChangeText={(text) => setOtp(text)}
  //       />
  //     )}
  //     <Button
  //       mode="contained"
  //       onPress={handleLogin}
  //       loading={isLoading}
  //       disabled={isLoading}
  //     >
  //       Login
  //     </Button>
  //     {/* Don't have account yet, Sign up here */}
  //     <Button
  //       mode="text"
  //       onPress={onSignup}
  //       loading={isLoading}
  //       disabled={isLoading}
  //     >
  //       Don't have account yet,{" "}
  //       <Text style={styles.signupText}> Sign up here</Text>
  //     </Button>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  signupText: {
    color: "blue",
  },
});
