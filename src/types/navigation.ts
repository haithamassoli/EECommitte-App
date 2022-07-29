import { NavigatorScreenParams } from "@react-navigation/native";

export type BottomTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Search: undefined;
  Subjects: NavigatorScreenParams<SubjectsStackParamList>;
  Bars: undefined;
  Info: undefined;
};

export type HomeStackParamList = {
  Feed: undefined;
};

export type SubjectsStackParamList = {
  Plan: undefined;
  Subject: { areaId: number };
};
