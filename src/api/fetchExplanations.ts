import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

const cacheIntervalInHours = 500;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

export function fetchExplanations(refetchCounter: number) {
  const { data, isLoading, isFetching } = useQuery(
    ["explanations", refetchCounter],
    async () => {
      const lastRequest = await getDataFromStorage("lastRequestExplanations");
      const connectionStatus = await NetInfo.fetch();
      const isCacheExpired =
        new Date().getTime() > new Date(lastRequest).getTime();
      if (
        (lastRequest == null && connectionStatus.isConnected) ||
        (isCacheExpired && connectionStatus.isConnected) ||
        (refetchCounter === 1 && connectionStatus.isConnected)
      ) {
        const q = query(
          collection(db, "explanations"),
          orderBy("time", "desc")
        );
        const querySnapshot = await getDocs(q);
        await storeDataToStorage("lastRequestExplanations", cacheExpiryTime);
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
    }
  );
  return { data, isLoading, isFetching };
}
