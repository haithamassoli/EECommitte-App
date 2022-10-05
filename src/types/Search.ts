import { StyleProp, ViewStyle } from "react-native";
import Fuse from "fuse.js";

type Focused = StaticProps & {
  searchBarFocused: boolean;
  setSearchBarFocused: React.Dispatch<React.SetStateAction<boolean>>;
  results: any[];
};
type NotFocused = StaticProps & {
  searchBarFocused?: never;
  setSearchBarFocused?: never;
  results?: never;
};

type StaticProps = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  style?: StyleProp<ViewStyle>;
  list: any[];
  setResults: React.Dispatch<React.SetStateAction<any[] | []>>;
  options: Fuse.IFuseOptions<any>;
  placeholder: string;
  from?: string;
};

export type SearchInputProps = Focused | NotFocused;
