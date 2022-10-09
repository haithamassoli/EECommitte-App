import { db } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

export function fetchNotifications(refetchCounter: number) {
  const { data, isLoading, refetch, isFetching } = useQuery(
    ["notifications", refetchCounter],
    async () => {
      const connectionStatus = await NetInfo.fetch();
      if (
        (refetchCounter === 1 && connectionStatus.isConnected) ||
        connectionStatus.isConnected
      ) {
        const q = query(
          collection(db, "notifications"),
          orderBy("time", "desc")
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => doc.data());
      } else {
        return [];
      }
    }
  );
  return { data, isLoading, refetch, isFetching };
}
