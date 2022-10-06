import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export function fetchNotifications() {
  const { data, isLoading } = useQuery(["notifications"], async () => {
    const q = query(collection(db, "notifications"), orderBy("time", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  });
  return { data, isLoading };
}
