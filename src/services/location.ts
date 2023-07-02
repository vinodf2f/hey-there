import * as Location from "expo-location";
import firestore from "@react-native-firebase/firestore";
import { Person } from "../types";


export const checkLocationPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access location was denied");
    return false;
  } else {
    return true;
  }
};


export const updateUserLocation = async (uid: string) => {
  console.log("updatingUserLocation");
  return new Promise(async (resolve, reject) => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const { latitude, longitude } = coords;
      const location = { latitude, longitude };
      console.log({ location, uid });
      await firestore().collection("users").doc(uid).update({ location });
      console.log("Done updating user location");

      resolve(location);
    } catch (error) {
      reject(error);
    }
  });
};

// get all the users who are in the range of 5km from the current user location

export const getNearByUsers = async (location: unknown): Promise<Person[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await firestore().collection("users").get();
      const usersData = users.docs.map((user) => ({
        ...user.data(),
        uid:user.id,
      }));
      const usersArray= Object.values(usersData);
      const nearByUsers = usersArray.filter((user: any) => {
        if (user.location) {
          const distance = getDistance(location, user.location);
          if (distance < 5 && distance > 0) {
            return true;
          }
        }
        return false;
      });
      resolve(nearByUsers);
    } catch (error) {
      reject(error);
    }
  });
};


const getDistance = (location1: { latitude: any; longitude: any; }, location2: { latitude: any; longitude: any; }) => {
  const lat1 = location1.latitude;
  const lon1 = location1.longitude;
  const lat2 = location2.latitude;
  const lon2 = location2.longitude;
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

// const coordinates = [
//   { latitude: 12.930405, longitude: 77.665832 },
//   { latitude: 12.927711, longitude: 77.675122 },
//   { latitude: 12.929051, longitude: 77.670962 },
//   { latitude: 12.924492, longitude: 77.669114 },
//   { latitude: 12.931272, longitude: 77.663957 },
// ];


// export const addDummyUsers = async () => {
//   try {
//     coordinates.forEach(async (coordinate) => {
//       const { latitude, longitude } = coordinate;
//       const location = { latitude, longitude };
//       const user = {
//         location,
//       };
//       await firestore().collection("users").add(user);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// addDummyUsers()