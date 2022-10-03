import { db } from "@Src/firebase-config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function fetchFAQ() {
  const q = query(collection(db, "faq"), orderBy("time", "desc"));
  const querySnapshot = await getDocs(q);
  const notifications = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return notifications;
}
