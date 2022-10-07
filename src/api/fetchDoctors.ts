import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import { collection, getDocs, query } from "firebase/firestore";

const cacheIntervalInHours = 1000;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

export function fetchDoctors() {
  const { data, isLoading } = useQuery(["doctors"], async () => {
    const lastRequest = await getDataFromStorage("lastRequestDoctors");
    if (lastRequest == null || lastRequest > cacheExpiryTime) {
      const q = query(collection(db, "doctors"));
      const querySnapshot = await getDocs(q);
      await storeDataToStorage("lastRequestDoctors", new Date());
      const snapshot = querySnapshot.docs.map((doc) => doc.data());
      await storeDataToStorage("doctors", snapshot);
      return snapshot;
    } else {
      const doctors = await getDataFromStorage("doctors");
      return doctors;
    }
  });
  return { data, isLoading };
}
