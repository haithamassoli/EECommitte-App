import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import { collection, getDocs, query, where } from "firebase/firestore";

const cacheIntervalInHours = 500;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);
import NetInfo from "@react-native-community/netinfo";

export function fetchSubjectById(id: number, refetchCounter: number) {
  const { data, isLoading, isFetching } = useQuery(
    ["subjectById", id, refetchCounter],
    async () => {
      const lastRequest = await getDataFromStorage(
        `lastRequestsubjectById${id}`
      );
      const connectionStatus = await NetInfo.fetch();
      if (
        (lastRequest == null && connectionStatus.isConnected) ||
        (lastRequest > cacheExpiryTime && connectionStatus.isConnected) ||
        (refetchCounter === 1 && connectionStatus.isConnected)
      ) {
        const q = query(collection(db, "subjects"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
        await storeDataToStorage(`lastRequestsubjectById${id}`, new Date());
        const snapshot = querySnapshot.docs.map((doc) => doc.data())[0];
        await storeDataToStorage(`subjectById${id}`, snapshot);
        return snapshot;
      } else {
        const subject = await getDataFromStorage(`subjectById${id}`);
        if (subject == null) {
          return [];
        }
        return subject;
      }
    }
  );
  return { data, isLoading, isFetching };
}
