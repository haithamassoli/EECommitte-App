import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadImageMutation } from "@Src/api/uploadImage";

const initialOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  quality: 0.4,
  allowsEditing: true,
  allowsMultipleSelection: false,
};

export const useImagePicker = (
  options: ImagePicker.ImagePickerOptions = {}
): [string[], () => Promise<void>, boolean] => {
  const [imageList, setImageList] = useState<string[]>([]);
  const { mutateAsync, isLoading } = uploadImageMutation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      ...initialOptions,
      ...options,
    });

    if (!result.canceled) {
      await mutateAsync(result?.assets[0]?.uri, {
        onSuccess: (data) => {
          setImageList((prev) => [data, ...prev]);
        },
      });
    }
  };

  return [imageList, pickImage, isLoading];
};
