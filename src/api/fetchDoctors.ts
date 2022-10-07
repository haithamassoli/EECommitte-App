import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query } from "firebase/firestore";

export function fetchDoctors() {
  const { data, isLoading } = useQuery(["doctors"], async () => {
    const q = query(collection(db, "doctors"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  });
  return { data, isLoading };
}

// export function fetchDoctors(page: number) {
//   const { data, isLoading } = useQuery(["doctors"], async () => {
//     const q = query(
//       collection(db, "doctors"),
//       orderBy("name"),
//       startAfter(page * 10),
//       limit(10)
//     );
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs.map((doc) => doc.data());
//   });
//   return { data, isLoading };
// }
