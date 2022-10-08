import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

const cacheIntervalInHours = 100;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

export function fetchExplanations() {
  const { data, isLoading, refetch } = useQuery(["explanations"], async () => {
    const lastRequest = await getDataFromStorage("lastRequestExplanations");
    const connectionStatus = await NetInfo.fetch();
    if (
      (lastRequest == null && connectionStatus.isConnected) ||
      (lastRequest > cacheExpiryTime && connectionStatus.isConnected)
    ) {
      const q = query(collection(db, "explanations"), orderBy("id", "asc"));
      const querySnapshot = await getDocs(q);
      await storeDataToStorage("lastRequestExplanations", new Date());
      const snapshot = querySnapshot.docs.map((doc) => doc.data());
      await storeDataToStorage("explanations", snapshot);
      return snapshot;
    } else {
      const explanations = await getDataFromStorage("explanations");
      if (explanations == null) {
        return [];
      }
      return explanations;
    }
  });
  return { data, isLoading, refetch };
}
