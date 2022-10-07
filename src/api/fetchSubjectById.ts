import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

export function fetchSubjectById(id: number) {
  const { data, isLoading } = useQuery(["subjectById", id], async () => {
    const q = query(collection(db, "subjects"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data())[0];
  });
  return { data, isLoading };
}
