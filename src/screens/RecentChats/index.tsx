// A screen to show the list of recent chats and navigate to chat screen

import * as React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";

import { useUserContext } from "../../context/userContext";
import { getRecentChats } from "../../services/chat";

export default function RecentChats({ navigation }) {
  const { user } = useUserContext();
  const [chats, setChats] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const intialLoad = async () => {
    try {
      setIsLoading(true);
      const chats = await getRecentChats(user?.uid);
      setChats(chats);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    navigation.setOptions({
      title:"Recent Chats"
    })
    intialLoad();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>Getting your chats</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={({ item: chat }) => (
          <List.Item
            key={chat.id}
            title={chat.title}
            description={chat.lastMessage.text}
            onPress={() => {
              // console.log({ chat })
              // return
              navigation.navigate("Chat", {
                chatId: chat.id,
                title: chat.selectedUserId,
              });
            }}
            style={styles.listItem}
            left={(props) => <List.Icon {...props} icon="message" />}
            titleStyle={{ fontWeight: "bold" }}
            descriptionStyle={styles.lastMessage}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex:1
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  lastMessage: {
    fontSize: 14,
    color: "#888",
  },
});
