import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const cacheIntervalInHours = 24;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

export function fetchSliderImages() {
  const { data, isLoading } = useQuery(["slider"], async () => {
    const lastRequest = await getDataFromStorage("lastRequestSlider");
    if (lastRequest == null || lastRequest > cacheExpiryTime) {
      const q = query(collection(db, "slider"), orderBy("time", "desc"));
      const querySnapshot = await getDocs(q);
      await storeDataToStorage("lastRequestSlider", new Date());
      const snapshot = querySnapshot.docs.map((doc) => doc.data());
      await storeDataToStorage("slider", snapshot);
      return snapshot;
    } else {
      const slider = await getDataFromStorage("slider");
      return slider;
    }
  });
  return { data, isLoading };
}
