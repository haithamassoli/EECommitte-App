import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjmfp-bRp7yyil2J_p_AgJteCtpLRHuJo",
  authDomain: "eecommitte.firebaseapp.com",
  projectId: "eecommitte",
  storageBucket: "eecommitte.appspot.com",
  messagingSenderId: "698743371521",
  appId: "1:698743371521:web:efbb52edc9cdcd12d74d00",
  measurementId: "G-1PNF6XZRMF",
};

// @ts-ignore
const app = initializeApp(firebaseConfig);

// export const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
// });
export const db = getFirestore(app);
export const storage = getStorage(app);
