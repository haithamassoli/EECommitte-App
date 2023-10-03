import { createContext, useEffect, useState } from "react";
import { getDataMMKV, storeDataMMKV } from "@Utils/Helper";
import { LayoutAnimation } from "react-native";

type FavoriteType = {
  id: number;
  name: string;
};

export const FavoriteContext = createContext<{
  favorite: FavoriteType[];
  toggleFavorite: (subject: FavoriteType) => void;
}>({
  favorite: [],
  toggleFavorite: (subject: FavoriteType) => {},
});

export const FavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorite, setFavorite] = useState<FavoriteType[] | []>([]);

  useEffect(() => {
    const getFavorite = () => {
      const favorite = getDataMMKV("favorite");
      if (favorite) {
        setFavorite(favorite);
      }
    };
    getFavorite();
  }, []);
  const toggleFavorite = (subject: FavoriteType) => {
    const prevFavorite = getDataMMKV("favorite");
    if (prevFavorite) {
      const isExist = prevFavorite.find(
        (item: FavoriteType) => item.id === subject.id
      );
      if (!isExist) {
        const newFavorite = [...prevFavorite, subject];
        storeDataMMKV("favorite", [...prevFavorite, subject]);
        setFavorite(newFavorite);
      } else {
        const newFavorite = prevFavorite.filter(
          (item: FavoriteType) => item.id !== subject.id
        );
        storeDataMMKV("favorite", newFavorite);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setFavorite(newFavorite);
      }
    } else {
      storeDataMMKV("favorite", [subject]);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setFavorite([subject]);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorite, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
