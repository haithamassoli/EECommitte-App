import { db } from "@Src/firebase-config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getDataMMKV, storeDataMMKV } from "@Utils/Helper";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

const cacheIntervalInHours = 500;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

export function fetchExplanations(refetchCounter: number) {
  const { data, isLoading, isFetching } = useQuery(
    ["explanations", refetchCounter],
    async () => {
      const lastRequest = getDataMMKV("lastRequestExplanations");
      const connectionStatus = await NetInfo.fetch();
      const isCacheExpired =
        new Date().getTime() > new Date(lastRequest).getTime();
      if (
        (lastRequest == null && connectionStatus.isConnected) ||
        (isCacheExpired && connectionStatus.isConnected) ||
        (refetchCounter === 1 && connectionStatus.isConnected)
      ) {
        const q = query(
          collection(db, "explanations"),
          orderBy("time", "desc")
        );
        const querySnapshot = await getDocs(q);
        storeDataMMKV("lastRequestExplanations", cacheExpiryTime);
        const snapshot = querySnapshot.docs.map((doc) => doc.data());
        storeDataMMKV("explanations", snapshot);
        return snapshot;
      } else {
        const explanations = getDataMMKV("explanations");
        if (explanations == null) {
          return [];
        }
        return explanations;
      }
    }
  );
  return { data, isLoading, isFetching };
}

export const fetchExplanationsQuery = () =>
  useQuery(["explanations"], async () => {
    try {
      const q = query(collection(db, "explanations"), orderBy("time", "desc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as {
          id: string;
          doctor: string;
          image: string;
          time: Date;
          link: string;
          searchName: string;
          subject: string;
        };
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  });

export const updateExplanationsMutation = () =>
  useMutation(
    (data: {
      id: string;
      doctor: string;
      image: string;
      time: Date;
      link: string;
      searchName: string;
      subject: string;
    }) => updateDoc(doc(db, "explanations", data.id), data)
  );

export const addExplanationsMutation = () =>
  useMutation(
    (data: {
      doctor: string;
      image: string;
      time: Date;
      link: string;
      searchName: string;
      subject: string;
    }) => {
      return addDoc(collection(db, "explanations"), data);
    }
  );

export const deleteExplanationsMutation = () =>
  useMutation((id: string) => deleteDoc(doc(db, "explanations", id)));
