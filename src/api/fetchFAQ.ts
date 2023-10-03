import { db } from "@Src/firebase-config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

const cacheIntervalInHours = 1000;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

export function fetchFAQ(refetchCounter: number) {
  const { data, isLoading, isFetching } = useQuery(
    ["faq", refetchCounter],
    async () => {
      const lastRequest = await getDataFromStorage("lastRequestFaq");
      const connectionStatus = await NetInfo.fetch();
      const isCacheExpired =
        new Date().getTime() > new Date(lastRequest).getTime();
      if (
        (lastRequest == null && connectionStatus.isConnected) ||
        (isCacheExpired && connectionStatus.isConnected) ||
        (refetchCounter === 1 && connectionStatus.isConnected)
      ) {
        const q = query(collection(db, "faq"), orderBy("time", "desc"));
        const querySnapshot = await getDocs(q);
        await storeDataToStorage("lastRequestFaq", cacheExpiryTime);
        const snapshot = querySnapshot.docs.map((doc) => doc.data());
        await storeDataToStorage("faq", snapshot);
        return snapshot;
      } else {
        const faq = await getDataFromStorage("faq");
        if (faq == null) {
          return [];
        }
        return faq;
      }
    }
  );
  return { data, isLoading, isFetching };
}

export const fetchFAQQuery = () =>
  useQuery(["faq"], async () => {
    try {
      const q = query(collection(db, "faq"), orderBy("time", "desc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as {
          id: string;
          title: string;
          content: string;
          time: Date;
        };
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  });

export const updateFAQMutation = () =>
  useMutation(
    (data: { id: string; title: string; content: string; time: Date }) =>
      updateDoc(doc(db, "faq", data.id), data)
  );

export const addFAQMutation = () =>
  useMutation((data: { title: string; content: string; time: Date }) => {
    return addDoc(collection(db, "faq"), data);
  });

export const deleteFAQMutation = () =>
  useMutation((id: string) => deleteDoc(doc(db, "faq", id)));
