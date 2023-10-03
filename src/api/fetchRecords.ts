import { db } from "@Src/firebase-config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDataMMKV, storeDataMMKV } from "@Utils/Helper";
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

const cacheIntervalInHours = 500;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

export function fetchRecords(refetchCounter: number) {
  const { data, isLoading, isFetching } = useQuery(
    ["records", refetchCounter],
    async () => {
      const recordsSec: any = [];
      const lastRequest = getDataMMKV("lastRequestRecords");
      const connectionStatus = await NetInfo.fetch();
      const isCacheExpired =
        new Date().getTime() > new Date(lastRequest).getTime();
      if (
        (lastRequest == null && connectionStatus.isConnected) ||
        (isCacheExpired && connectionStatus.isConnected) ||
        (refetchCounter === 1 && connectionStatus.isConnected)
      ) {
        const q = query(collection(db, "records"), orderBy("time", "desc"));
        const querySnapshot = await getDocs(q);
        storeDataMMKV("lastRequestRecords", cacheExpiryTime);
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
        storeDataMMKV("records", recordsSec);
        return recordsSec;
      } else {
        const records = getDataMMKV("records");
        if (records == null) {
          return [];
        }
        return records;
      }
    }
  );
  return { data, isLoading, isFetching };
}

export function fetchSearchRecords() {
  const { data, isLoading } = useQuery(["searchRecords"], async () => {
    const lastRequest = getDataMMKV("lastRequestSearchRecords");
    const connectionStatus = await NetInfo.fetch();
    const isCacheExpired =
      new Date().getTime() > new Date(lastRequest).getTime();
    if (
      (lastRequest == null && connectionStatus.isConnected) ||
      (isCacheExpired && connectionStatus.isConnected)
    ) {
      const q = query(collection(db, "records"), orderBy("id", "asc"));
      const querySnapshot = await getDocs(q);
      storeDataMMKV("lastRequestSearchRecords", cacheExpiryTime);
      const snapshot = querySnapshot.docs.map((doc) => doc.data());
      storeDataMMKV("searchRecords", snapshot);
      return snapshot;
    } else {
      const records = getDataMMKV("searchRecords");
      if (records == null) {
        return [];
      }
      return records;
    }
  });
  return { data, isLoading };
}

export const fetchRecordsQuery = () =>
  useQuery(["records"], async () => {
    try {
      const q = query(collection(db, "records"), orderBy("time", "desc"));
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

export const updateRecordMutation = () =>
  useMutation(
    (data: {
      id: string;
      doctor: string;
      image: string;
      time: Date;
      link: string;
      searchName: string;
      subject: string;
    }) => updateDoc(doc(db, "records", data.id), data)
  );

export const addRecordMutation = () =>
  useMutation(
    (data: {
      doctor: string;
      image: string;
      time: Date;
      link: string;
      searchName: string;
      subject: string;
    }) => {
      return addDoc(collection(db, "records"), data);
    }
  );

export const deleteRecordMutation = () =>
  useMutation((id: string) => deleteDoc(doc(db, "records", id)));
