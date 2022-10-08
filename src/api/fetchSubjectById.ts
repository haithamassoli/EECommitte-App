import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import { collection, getDocs, query, where } from "firebase/firestore";

const cacheIntervalInHours = 100;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

export function fetchSubjectById(id: number) {
  const { data, isLoading } = useQuery(["subjectById", id], async () => {
    const lastRequest = await getDataFromStorage(`lastRequestsubjectById${id}`);
    if (lastRequest == null || lastRequest > cacheExpiryTime) {
      const q = query(collection(db, "subjects"), where("id", "==", id));
      const querySnapshot = await getDocs(q);
      await storeDataToStorage(`lastRequestsubjectById${id}`, new Date());
      const snapshot = querySnapshot.docs.map((doc) => doc.data())[0];
      await storeDataToStorage(`subjectById${id}`, snapshot);
      return snapshot;
    } else {
      const records = await getDataFromStorage(`subjectById${id}`);
      return records;
    }
  });
  return { data, isLoading };
}
