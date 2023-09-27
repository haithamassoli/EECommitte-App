import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useMutation } from "@tanstack/react-query";
import { storage } from "@Src/firebase-config";

export const uploadImageMutation = () => {
  return useMutation({
    mutationFn: (uri: string) => uploadImageAsync(uri),
  });
};

async function uploadImageAsync(uri: string) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const fileName = uri.split("/").pop();
  const fileRef = ref(storage, `images/${fileName}-${Date.now()}`);
  await uploadBytes(fileRef, blob);
  return await getDownloadURL(fileRef);
}
