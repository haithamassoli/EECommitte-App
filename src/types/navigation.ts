import { NavigatorScreenParams } from "@react-navigation/native";

export type BottomTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Search: undefined;
  Subjects: NavigatorScreenParams<SubjectsStackParamList>;
  Bars: undefined;
  Info: undefined;
};

export type HomeStackParamList = {
  feed: undefined;
};

export type SubjectsStackParamList = {
  plan: undefined;
  subject: { areaId: number };
};
