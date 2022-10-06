import { storage } from "@Src/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { ref, getDownloadURL, listAll } from "firebase/storage";

export function fetchSliderImages() {
  const { data, isLoading } = useQuery(["slider"], async () => {
    const images: string[] = [];
    const listRef = ref(storage, "slider");
    const res = await listAll(listRef);
    res.items.forEach(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      images.push(url);
    });
    return images;
  });
  return { data, isLoading };
}
