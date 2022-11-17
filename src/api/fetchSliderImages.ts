import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

const cacheIntervalInHours = 24;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

export function fetchSliderImages(refetchCounter: number) {
  const { data, isLoading, isFetching } = useQuery(
    ["slider", refetchCounter],
    async () => {
      const lastRequest = await getDataFromStorage("lastRequestSlider");
      const connectionStatus = await NetInfo.fetch();
      const isCacheExpired =
        new Date().getTime() > new Date(lastRequest).getTime();
      if (
        (lastRequest == null && connectionStatus.isConnected) ||
        (isCacheExpired && connectionStatus.isConnected) ||
        (refetchCounter === 1 && connectionStatus.isConnected)
      ) {
        const q = query(collection(db, "slider"), orderBy("time", "desc"));
        const querySnapshot = await getDocs(q);
        await storeDataToStorage("lastRequestSlider", cacheExpiryTime);
        const snapshot = querySnapshot.docs.map((doc) => doc.data());
        await storeDataToStorage("slider", snapshot);
        return snapshot;
      } else {
        const slider = await getDataFromStorage("slider");
        if (slider == null) {
          return [];
        }
        return slider;
      }
    }
  );
  return { data, isLoading, isFetching };
}
