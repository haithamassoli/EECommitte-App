import { db } from "@Src/firebase-config";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

export const checkPasswordMutation = () =>
  useMutation(async (password: string) => {
    try {
      const q = query(
        collection(db, "password"),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);
      const snapshot = querySnapshot.docs.map((doc) => doc.data())[0];
      return snapshot;
    } catch (e: any) {
      console.error("Error updating document: ", e);
    }
  });
