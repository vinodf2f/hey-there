import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { IUser } from "../context/userContext";
function generateChatId(userId1: any, userId2: any) {
  const sortedUserIds = [userId1, userId2].sort();
  const chatId = sortedUserIds.join("_");

  return chatId;
}

export async function createChat(user1Id: string | undefined, user2Id: number) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = firestore();
      const chatId = generateChatId(user1Id, user2Id);
      const chatRef = db.collection("chats").doc(chatId);

      const chatDoc = await chatRef.get();
      if (chatDoc.exists) {
        const chat = chatDoc.data();
        resolve({ id: chatId, ...chat });
      } else {
        const chat = {
          createdAt: firestore.FieldValue.serverTimestamp(),
          participants: [user1Id, user2Id],
          messages: [],
        };
        await chatRef.set(chat);
        resolve({ id: chatId, ...chat });
      }
    } catch (error) {
      reject(error);
    }
  });
}

// Retrieve the chats of a specific user
export async function getRecentChats(userId: string | undefined) {
  try {
    const db = firestore();

    const querySnapshot = await db
      .collection("chats")
      .where("participants", "array-contains", userId)
      .get();

    const chats: FirebaseFirestoreTypes.DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      const chat = doc.data();
      const selectedUser = chat.participants.filter(
        (id: any) => id != userId
      )[0];

      chat.id = doc.id;
      chat.title = "Chat with " + selectedUser;
      chat.image = "https://placeimg.com/140/140/any";
      chat.selectedUserId = selectedUser;
      chats.push(chat);
    });

    // Get the last message for each chat
    const chatsWithLastMessage = await Promise.all(
      chats.map(async (chat) => {
        const lastMessageSnapshot = await db
          .collection("chats")
          .doc(chat.id)
          .collection("messages")
          .orderBy("createdAt", "desc")
          .limit(1)
          .get();

        const lastMessage = lastMessageSnapshot.docs[0]?.data();
        chat.lastMessage = lastMessage;
        return chat;
      })
    );

    return chatsWithLastMessage;
  } catch (error) {
    console.error("Error retrieving chats:", error);
    return [];
  }
}

export const subscribeToChatMessages = (chatId: string, callback: Function) => {
  return firestore()
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      const messagesData = snapshot.docs.map((doc) => {
        const message = doc.data();
        return {
          _id: doc.id,
          text: message.text,
          createdAt: message.createdAt,
          user: {
            _id: message.user._id,
            name: message.user.name,
          },
        };
      });
      callback(messagesData);
    });
};

export const addChatMessage = (
  chatId: string | undefined,
  message: { text: string },
  user: IUser
) => {
  firestore()
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add({
      text: message.text,
      createdAt: new Date().getTime(),
      user: {
        _id: user?.uid,
        name: user?.displayName,
      },
    });
};

export const deleteAllChatsByUser = async (userId: string | undefined) => {
  const db = firestore();
  const querySnapshot = await db
    .collection("chats")
    .where("participants", "array-contains", userId)
    .get();

  querySnapshot.forEach(async (doc) => {
    await db.collection("chats").doc(doc.id).delete();
  });
};
