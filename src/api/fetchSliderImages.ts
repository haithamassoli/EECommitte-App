import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export function fetchSliderImages() {
  const { data, isLoading } = useQuery(["slider"], async () => {
    const q = query(collection(db, "slider"), orderBy("time", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  });
  return { data, isLoading };
}
