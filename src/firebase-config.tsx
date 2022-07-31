import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// @ts-ignore
const app = initializeApp(Constants?.manifest?.web?.config?.firebase);
export const db = getFirestore(app);
