import { StyleProp, ViewStyle } from "react-native";
import { Doctor, Subject } from "./index";
import Fuse from "fuse.js";

type Focused = StaticProps &
  (SubjectSearchInputProps | DoctorSearchInputProps) & {
    searchBarFocused: boolean;
    setSearchBarFocused: React.Dispatch<React.SetStateAction<boolean>>;
    results: Doctor[] | Subject[];
  };
type NotFocused = StaticProps &
  (SubjectSearchInputProps | DoctorSearchInputProps) & {
    searchBarFocused?: never;
    setSearchBarFocused?: never;
    results?: never;
  };

type SubjectSearchInputProps = {
  list: readonly Subject[];
  setResults: React.Dispatch<React.SetStateAction<Subject[] | []>>;
  options: Fuse.IFuseOptions<Subject>;
};
type DoctorSearchInputProps = {
  list: readonly Doctor[];
  setResults: React.Dispatch<React.SetStateAction<Doctor[] | []>>;
  options: Fuse.IFuseOptions<Doctor>;
};

type StaticProps = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  style?: StyleProp<ViewStyle>;
};

export type SearchInputProps = Focused | NotFocused;
