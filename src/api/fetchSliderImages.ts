import { db } from "@Src/firebase-config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getDataMMKV, storeDataMMKV } from "@Utils/Helper";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

const cacheIntervalInHours = 24;
const cacheExpiryTime = new Date();
cacheExpiryTime.setHours(cacheExpiryTime.getHours() + cacheIntervalInHours);

type SliderImage = {
  url: string;
  image: string;
  time: Date;
};

export function fetchSliderImages(refetchCounter: number) {
  const { data, isLoading, isFetching } = useQuery(
    ["slider", refetchCounter],
    async () => {
      const lastRequest = getDataMMKV("lastRequestSlider");
      const connectionStatus = await NetInfo.fetch();
      const isCacheExpired =
        new Date().getTime() > new Date(lastRequest).getTime();
      if (
        (lastRequest == null && connectionStatus.isConnected) ||
        (isCacheExpired && connectionStatus.isConnected) ||
        (refetchCounter === 1 && connectionStatus.isConnected)
      ) {
        const q = query(collection(db, "slider"), orderBy("time", "desc"));
        const querySnapshot = await getDocs(q);
        storeDataMMKV("lastRequestSlider", cacheExpiryTime);
        const snapshot = querySnapshot.docs.map((doc) => doc.data());
        storeDataMMKV("slider", snapshot);
        return snapshot as SliderImage[];
      } else {
        const slider = getDataMMKV("slider");
        if (slider == null) {
          return [];
        }
        return slider as SliderImage[];
      }
    }
  );
  return { data, isLoading, isFetching };
}

export const fetchSliderImagesQuery = () =>
  useQuery(["slider"], async () => {
    const q = query(collection(db, "slider"), orderBy("time", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as {
        url: string;
        image: string;
        id: string;
        time: Date;
      };
    });
  });

export const addSliderMutation = () =>
  useMutation((slider: SliderImage) => addSlider(slider));

const addSlider = async (slider: SliderImage) => {
  try {
    await addDoc(collection(db, "slider"), slider);
    return true;
  } catch (e: any) {
    console.error("Error updating document: ", e);
  }
};

export const deleteSliderMutation = () =>
  useMutation((id: string) => deleteSlider(id));

const deleteSlider = async (id: string) => {
  try {
    await deleteDoc(doc(db, "slider", id));
    return true;
  } catch (e: any) {
    console.error("Error updating document: ", e);
  }
};
