import { storage } from "@Src/firebase-config";
import { ref, getDownloadURL, listAll } from "firebase/storage";

export async function fetchSliderImages(): Promise<string[]> {
  const images: string[] = [];
  const listRef = ref(storage, "slider");
  const res = await listAll(listRef);
  res.items.forEach(async (itemRef) => {
    const url = await getDownloadURL(itemRef);
    images.push(url);
  });
  console.log(images);
  return images;
}
