import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

// TODO: Implement OTP verification

export default function VerifyOtp({ }) {
  return null
  // const [otpValue, setOtp] = useState("");

  // const handleVerifyOtp = () => {
  //   onSubmit(otpValue);
  // };

  // const handleResendOtp = () => {
  //   // Resend OTP
  // };

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.subTitle}>Enter OTP sent to your mobile number</Text>
  //     <TextInput
  //       label="OTP"
  //       value={otpValue}
  //       onChangeText={(text) => setOtp(text)}
  //       style={{ marginBottom: 20 }}
  //     />
  //     <Button
  //       mode="contained"
  //       onPress={handleVerifyOtp}
  //       style={{ marginBottom: 20 }}
  //     >
  //       Verify OTP
  //     </Button>
  //     <Button
  //       mode="outlined"
  //       onPress={handleResendOtp}
  //       style={{ marginBottom: 20 }}
  //     >
  //       Resend OTP
  //     </Button>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
  },
  subTitle: {
    fontSize: 13,
    marginBottom: 10,
  },
});
