import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

const cacheIntervalInHours = 1000;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

export function fetchFAQ(refetchCounter: number) {
  const { data, isLoading, isFetching } = useQuery(
    ["faq", refetchCounter],
    async () => {
      const lastRequest = await getDataFromStorage("lastRequestFaq");
      const connectionStatus = await NetInfo.fetch();
      if (
        (lastRequest == null && connectionStatus.isConnected) ||
        (lastRequest > cacheExpiryTime && connectionStatus.isConnected) ||
        (refetchCounter === 1 && connectionStatus.isConnected)
      ) {
        const q = query(collection(db, "faq"), orderBy("time", "desc"));
        const querySnapshot = await getDocs(q);
        await storeDataToStorage("lastRequestFaq", new Date());
        const snapshot = querySnapshot.docs.map((doc) => doc.data());
        await storeDataToStorage("faq", snapshot);
        return snapshot;
      } else {
        const faq = await getDataFromStorage("faq");
        if (faq == null) {
          return [];
        }
        return faq;
      }
    }
  );
  return { data, isLoading, isFetching };
}
