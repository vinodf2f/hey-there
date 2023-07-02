import auth from "@react-native-firebase/auth";
import { deleteAllChatsByUser } from "./chat";
import { deleteUser } from "./userService";

export const authenticateUser = async (phoneNumber: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        `+91${phoneNumber}`
      );

      resolve(confirmation);
    } catch (error) {
      reject(error);
    }
  });
};

// verify otp sent to the user with typescript
export const verifyOTP = async (confirmation: any, otp: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await confirmation.confirm(otp);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const signInAnonymously = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await auth().signInAnonymously();
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//Sign out and delete user
export const signOut = async () => {
  try {
    const user = auth().currentUser;
    const response = await auth().signOut();
    const deleted = await deleteUser(user?.uid);
    const deleteChats = await deleteAllChatsByUser(user?.uid);
  } catch (error) {
    console.log(error);
  }
};


