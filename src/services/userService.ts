import firestore from "@react-native-firebase/firestore";

export const createUser = async (user: any) => {
  try {
    const ref = await firestore().collection("users").doc(user.uid).set({});

    console.log("User created successfully.");
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const deleteUser = async (uid: any) => {
  return new Promise(async (resolve, reject) => {
    if (uid) {
      try {
        await firestore().collection("users").doc(uid).delete();
        resolve(true);
        console.log("User deleted successfully");
      } catch (error) {
        reject(error);
        console.error("Error deleting user:", error);
      }
    }
  });
};
