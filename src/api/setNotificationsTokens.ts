import { db } from "@Src/firebase-config";
import { collection, getDocs, query, addDoc } from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

export async function setNotificationsTokens(token: string) {
  const connectionStatus = await NetInfo.fetch();
  if (connectionStatus.isConnected) {
    const q = query(collection(db, "notificationsTokens"));
    const querySnapshot = await getDocs(q);
    const tokens = querySnapshot.docs.map((doc) => doc.data().token);
    if (!tokens.includes(token)) {
      await addDoc(collection(db, "notificationsTokens"), {
        token,
      });
    }
  }
  return null;
}
