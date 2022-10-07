import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
const cacheIntervalInHours = 24;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);
export function fetchFAQ() {
  const { data, isLoading } = useQuery(["faq"], async () => {
    const lastRequest = await getDataFromStorage("lastRequestFaq");
    if (lastRequest == null || lastRequest > cacheExpiryTime) {
      const q = query(collection(db, "faq"), orderBy("time", "desc"));
      const querySnapshot = await getDocs(q);
      await storeDataToStorage("lastRequestFaq", new Date());
      const snapshot = querySnapshot.docs.map((doc) => doc.data());
      return await storeDataToStorage("faq", snapshot);
    } else {
      return await getDataFromStorage("faq");
    }
  });
  return { data, isLoading };
}
