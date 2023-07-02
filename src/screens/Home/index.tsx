import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { ActivityIndicator, FAB } from "react-native-paper";

import { useUserContext } from "../../context/userContext";
import { createChat } from "../../services/chat";
import {
  checkLocationPermission,
  getNearByUsers,
  updateUserLocation,
} from "../../services/location";
import { Person } from "../../types";

interface IHomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: IHomeScreenProps) {
  const { user } = useUserContext();
  const [nearbyUsers, setNearbyUsers] = useState<Person[]>([]);
  const [location, setLocation] = useState<any>(null); // TODO: type this
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const intialLoadRef = useRef(false);

  const intialLoad = async () => {
    try {
      setIsLoading(true);
      const isGranted = await checkLocationPermission();
      if (isGranted && user) {
        const location = await updateUserLocation(user?.uid);
        setLocation(location);
        const users = await getNearByUsers(location);
        setNearbyUsers(users);
      } else {
        console.log("Permission not granted");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    intialLoadRef.current = true;
    intialLoad();
  }, []);

  const handleOnCalloutPress = async (selectedUser: Person) => {
    const chatData: any = await createChat(user?.uid, selectedUser.uid);
    console.log({ chatData });
    navigation.navigate("Chat", {
      chatId: chatData.id,
      title: selectedUser.uid,
    });
  };

  const handleOnFabPress = () => {
    console.log("fab pressed");
    navigation.navigate("RecentChats");
  };
  if (isLoading && !intialLoadRef) <ActivityIndicator />;

  return (
    <>
      <View style={styles.container}>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              key={999}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={"You"}
              description={"description"}
              pinColor={"skyblue"}
            >
              <Callout>
                <Text>you</Text>
              </Callout>
            </Marker>

            {nearbyUsers.map((user, index) => (
              <Marker
                key={user.uid}
                coordinate={{
                  latitude: user.location.latitude,

                  longitude: user.location.longitude,
                }}
                title={`${user.uid}`}
                description={"Anaonymous"}
                onCalloutPress={() => handleOnCalloutPress(user)}
              >
                <Callout>
                  <View style={{ height: 30 }}>
                    <Text>{user.uid}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
            <Circle
              radius={1000}
              center={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
          </MapView>
        )}
      </View>
      <FAB
        style={styles.fabRefresh}
        icon={isLoading ? "loading" : "refresh"}
        onPress={intialLoad}
      />

      <FAB
        style={styles.fabMessages}
        icon="message"
        onPress={handleOnFabPress}
      />
    </>
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
  fabMessages: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fabRefresh: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 80,
  },
});
