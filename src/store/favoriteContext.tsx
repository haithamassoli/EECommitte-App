import { createContext, useEffect, useState } from "react";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";

type FavoriteType = {
  id: number;
  name: string;
};

export const FavoriteContext = createContext<{
  favorite: FavoriteType[];
  addFavorite: (subject: FavoriteType) => void;
}>({
  favorite: [],
  addFavorite: (subject: FavoriteType) => {},
});

export const FavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorite, setFavorite] = useState<FavoriteType[] | []>([]);

  useEffect(() => {
    const getFavorite = async () => {
      const favorite = await getDataFromStorage("favorite");
      if (favorite) {
        setFavorite(favorite);
      }
    };
    getFavorite();
  }, []);
  const addFavorite = async (subject: FavoriteType) => {
    const prevFavorite = await getDataFromStorage("favorite");
    if (prevFavorite) {
      const isExist = prevFavorite.find(
        (item: FavoriteType) => item.id === subject.id
      );
      if (!isExist) {
        const newFavorite = [...prevFavorite, subject];
        await storeDataToStorage("favorite", [...prevFavorite, subject]);
        setFavorite(newFavorite);
      } else {
        const newFavorite = prevFavorite.filter(
          (item: FavoriteType) => item.id !== subject.id
        );
        await storeDataToStorage("favorite", newFavorite);
        setFavorite(newFavorite);
      }
    } else {
      await storeDataToStorage("favorite", [subject]);
      setFavorite([subject]);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorite, addFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
