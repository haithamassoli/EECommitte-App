import { db } from "@Src/firebase-config";
import { collection, getDocs, query } from "firebase/firestore";

export async function fetchNotifications() {
  const q = query(collection(db, "notifications"));
  const querySnapshot = await getDocs(q);
  const notifications = querySnapshot.docs.map((doc) => doc.data());
  return notifications;
}
