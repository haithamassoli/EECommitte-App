import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const cacheIntervalInHours = 100;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

export function fetchRecords() {
  const { data, isLoading } = useQuery(["records"], async () => {
    const recordsSec: any = [];
    const lastRequest = await getDataFromStorage("lastRequestRecords");
    if (lastRequest == null || lastRequest > cacheExpiryTime) {
      const q = query(collection(db, "records"), orderBy("id", "asc"));
      const querySnapshot = await getDocs(q);
      await storeDataToStorage("lastRequestRecords", new Date());
      const snapshot = querySnapshot.docs.map((doc) => doc.data());
      snapshot.forEach((doc: any, index: number) => {
        if (index == 0) {
          recordsSec.push("تسجيلات اللجنة");
        }
        if (!doc.notEEC) {
          recordsSec.push(doc);
        }
      });
      snapshot.forEach((doc: any, index: number) => {
        if (index == 0) {
          recordsSec.push("تسجيلات  المعلمين");
        }
        if (doc.notEEC) {
          recordsSec.push(doc);
        }
      });
      await storeDataToStorage("records", recordsSec);
      return recordsSec;
    } else {
      const records = await getDataFromStorage("records");
      return records;
    }
  });
  return { data, isLoading };
}

export function fetchSearchRecords() {
  const { data, isLoading } = useQuery(["searchRecords"], async () => {
    const lastRequest = await getDataFromStorage("lastRequestSearchRecords");
    if (lastRequest == null || lastRequest > cacheExpiryTime) {
      const q = query(collection(db, "records"), orderBy("id", "asc"));
      const querySnapshot = await getDocs(q);
      await storeDataToStorage("lastRequestSearchRecords", new Date());
      const snapshot = querySnapshot.docs.map((doc) => doc.data());
      await storeDataToStorage("records", snapshot);
      return snapshot;
    } else {
      const records = await getDataFromStorage("records");
      return records;
    }
  });
  return { data, isLoading };
}
