import { db } from "@Src/firebase-config";
import { collection, getDocs, query, addDoc } from "firebase/firestore";
import { getDataMMKV, storeDataMMKV } from "@Utils/Helper";
import NetInfo from "@react-native-community/netinfo";

const cacheIntervalInHours = 1000000000;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

export async function setNotificationsTokens(token: string) {
  const lastSet = getDataMMKV("lastSetNotificationsTokens");
  const connectionStatus = await NetInfo.fetch();
  if (
    lastSet == null &&
    connectionStatus.isConnected
    // || (new Date() > lastSet && connectionStatus.isConnected)
  ) {
    const q = query(collection(db, "notificationsTokens"));
    const querySnapshot = await getDocs(q);
    storeDataMMKV("lastSetNotificationsTokens", cacheExpiryTime);
    const tokens = querySnapshot.docs.map((doc) => doc.data().token);
    if (!tokens.includes(token)) {
      await addDoc(collection(db, "notificationsTokens"), {
        token,
      });
    }
  }
  return null;
}
