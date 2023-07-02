import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { useUserContext } from "../../context/userContext";
import { addChatMessage, subscribeToChatMessages } from "../../services/chat";

type Props = {
  route: any;
  navigation: any;
};

const ChatSCreen = ({ route, navigation }: Props) => {
  const { chatId, title } = route.params;
  const { user } = useUserContext();
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    navigation.setOptions({
      title,
    });

    const unsubscribeListener = subscribeToChatMessages(
      chatId,
      (messagesData: any) => {
        setMessages(messagesData);
      }
    );

    return () => unsubscribeListener();
  }, []);

  const onSend = useCallback(
    (messages = []) => {
      console.log("sending..");
      const newMessage = messages[0];
      addChatMessage(chatId, newMessage, user);
    },
    [chatId, user]
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages:any) => onSend(messages)}
      user={{
        _id: user?.uid || "",
      }}
      dateFormat="DD/MM/YYYY"
    />
  );
};

export default ChatSCreen;
