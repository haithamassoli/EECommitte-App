import { db } from "@Src/firebase-config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";

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
      const isCacheExpired =
        new Date().getTime() > new Date(lastRequest).getTime();
      if (
        (lastRequest == null && connectionStatus.isConnected) ||
        (isCacheExpired && connectionStatus.isConnected) ||
        (refetchCounter === 1 && connectionStatus.isConnected)
      ) {
        const q = query(collection(db, "subjects"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
        await storeDataToStorage(
          `lastRequestsubjectById${id}`,
          cacheExpiryTime
        );
        const snapshot = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), uid: doc.id };
        })[0];
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

type Subject = {
  aboutSubject?: string;
  id?: number;
  subjectId: string;
  book?: string;
  color?: "#0200CF" | "#F79606" | "#F31313" | "#29abef" | "#AF02AB" | "#272727";
  fullPost?: string;
  name: string;
  name2: string;
  prevYears?: string;
  subjectLink: string;
  explanations?: Explanations[];
};

type Explanations = {
  name: string;
  link: string;
};

export const updateSubjectMutation = () =>
  useMutation((data: Subject) => updateSubject(data));

const updateSubject = async (data: Subject) => {
  try {
    let dataWithoutSubjectId = { ...data };
    delete dataWithoutSubjectId.subjectId;
    await updateDoc(doc(db, "subjects", data.subjectId), dataWithoutSubjectId);
    const dataWithId = { ...data, id: data.id };
    return dataWithId;
  } catch (e: any) {
    console.error("Error updating document: ", e);
  }
};

export const fetchSubjectByIdQuery = (subjectId: string) =>
  useQuery(["subjects", subjectId], () => getSubjectById(subjectId));

const getSubjectById = async (subjectId: string) => {
  const docRef = doc(db, "subjects", subjectId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), subjectId: docSnap.id } as Subject;
  } else {
    console.log("No such document!");
  }
};
