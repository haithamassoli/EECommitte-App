import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import { collection, getDocs, query } from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

const cacheIntervalInHours = 1000;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

export function fetchDoctors(refetchCounter: number) {
  const { data, isLoading, isFetching } = useQuery(
    ["doctors", refetchCounter],
    async () => {
      const lastRequest = await getDataFromStorage("lastRequestDoctors");
      const connectionStatus = await NetInfo.fetch();
      const isCacheExpired =
        new Date().getTime() > new Date(lastRequest).getTime();
      if (
        (lastRequest == null && connectionStatus.isConnected) ||
        (isCacheExpired && connectionStatus.isConnected) ||
        (refetchCounter === 1 && connectionStatus.isConnected)
      ) {
        const q = query(collection(db, "doctors"));
        const querySnapshot = await getDocs(q);
        await storeDataToStorage("lastRequestDoctors", cacheExpiryTime);
        const snapshot = querySnapshot.docs.map((doc) => doc.data());
        await storeDataToStorage("doctors", snapshot);
        return snapshot;
      } else {
        const doctors = await getDataFromStorage("doctors");
        if (doctors == null) {
          return [];
        }
        return doctors;
      }
    }
  );
  return { data, isLoading, isFetching };
}
