import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const cacheIntervalInHours = 100;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

export function fetchExplanations() {
  const { data, isLoading } = useQuery(["explanations"], async () => {
    const lastRequest = await getDataFromStorage("lastRequestExplanations");
    if (lastRequest == null || lastRequest > cacheExpiryTime) {
      const q = query(collection(db, "explanations"), orderBy("id", "asc"));
      const querySnapshot = await getDocs(q);
      await storeDataToStorage("lastRequestExplanations", new Date());
      const snapshot = querySnapshot.docs.map((doc) => doc.data());
      await storeDataToStorage("explanations", snapshot);
      return snapshot;
    } else {
      const explanations = await getDataFromStorage("explanations");
      return explanations;
    }
  });
  return { data, isLoading };
}
