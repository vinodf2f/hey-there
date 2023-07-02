// Sign up screen with phone number, age, gender and OTP input once user enters phone number and clicks on Signup button.

import React, { useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { Button, TextInput, RadioButton, HelperText } from "react-native-paper";
import VerifyOtp from "../../components/VerifyOtp";
import { validate } from "../../helpers/validation";
import { authenticateUser, verifyOTP } from "../../services/auth";

const initialFormValues = {
  phoneNumber: {
    value: "",
    errorMessage: "",
  },
  age: {
    value: "",
    errorMessage: "",
  },
  gender: {
    value: "",
    errorMessage: "",
  },
  name: {
    value: "",
    errorMessage: "",
  },
};
// TODO: implement Signup with phone number and OTP

export default function SignupScreen({  }) {
  return null
  // const [isFormDirty, setFormDirty] = useState(false);
  // const [formValues, setFormValues] = useState(initialFormValues);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [confirm, setConfirm]= useState<any>(null)

  // const onChange = (key, value) => {
  //   setFormValues({
  //     ...formValues,
  //     [key]: {
  //       value,
  //       errorMessage: validate(key, value).errorMessage,
  //     },
  //   });
  // };

  // const isFormValid = useMemo(() => {
  //   if (!isFormDirty) setFormDirty(true);
  //   return Object.values(formValues).every(
  //     (item) => item.errorMessage === "" && item.value !== ""
  //   );
  // }, [formValues]);

  // const handleSignup = async () => {
  //   if (!isFormValid) return;
  //   try {
  //     setIsLoading(true);
  //     const confirmation = await authenticateUser(formValues.phoneNumber.value);
  //     setConfirm(confirmation);
  //     console.log({confirmation})
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleVerifyOtp = async(otpValue: string) => {
  //   try {
  //     const res = await verifyOTP(confirm, otpValue)
  //     console.log(JSON.stringify(res))
  //   } catch (error) {
  //     console.error("Error:", error);

  //   }
  // };

  // const handleResendOtp = () => {};

  // if (confirm)
  //   return <VerifyOtp onSubmit={handleVerifyOtp} onResend={handleResendOtp} />;

  // return (
  //   <KeyboardAvoidingView style={styles.container} behavior="padding">
  //     <TextInput
  //       label="Name"
  //       value={formValues.name.value}
  //       onChangeText={(text) => onChange("name", text)}
  //       style={{ marginBottom: 20 }}
  //     />
  //     <TextInput
  //       label="Phone Number"
  //       value={formValues.phoneNumber.value}
  //       onChangeText={(text) => onChange("phoneNumber", text)}
  //       style={{ marginBottom: 20 }}
  //     />
  //     <TextInput
  //       label="Age"
  //       value={formValues.age.value}
  //       onChangeText={(text) => onChange("age", text)}
  //       style={{ marginBottom: 20 }}
  //     />
  //     <Text>Select Gender:</Text>
  //     <RadioButton.Group
  //       onValueChange={(text) => onChange("gender", text)}
  //       value={formValues.gender.value}
  //     >
  //       <View style={styles.genderContainer}>
  //         <RadioButton.Item label="Male" value="male" />
  //         <RadioButton.Item label="Female" value="female" />
  //         <RadioButton.Item label="Other" value="other" />
  //       </View>
  //     </RadioButton.Group>
  //     <HelperText type="error" visible={!isFormValid && isFormDirty}>
  //       Please fill all the fields correctly
  //     </HelperText>

  //     <Button mode="contained" onPress={handleSignup} loading={isLoading}>
  //       Send Otp
  //     </Button>
  //   </KeyboardAvoidingView>
  // );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   genderContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
// });
