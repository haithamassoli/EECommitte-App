import { db } from "@Src/firebase-config";
import { collection, getDocs, query, addDoc } from "firebase/firestore";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import NetInfo from "@react-native-community/netinfo";

const cacheIntervalInHours = 1000000000;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

export async function setNotificationsTokens(token: string) {
  const lastSet = await getDataFromStorage("lastSetNotificationsTokens");
  const connectionStatus = await NetInfo.fetch();
  if (
    (lastSet == null && connectionStatus.isConnected) ||
    (lastSet > cacheExpiryTime && connectionStatus.isConnected)
  ) {
    const q = query(collection(db, "notificationsTokens"));
    const querySnapshot = await getDocs(q);
    await storeDataToStorage("lastSetNotificationsTokens", new Date());
    const tokens = querySnapshot.docs.map((doc) => doc.data().token);
    if (!tokens.includes(token)) {
      await addDoc(collection(db, "notificationsTokens"), {
        token,
      });
    }
  }
  return null;
}
