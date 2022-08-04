import { NavigatorScreenParams } from "@react-navigation/native";

export type BottomTabParamList = {
  Home: undefined;
  News: undefined;
  Search: undefined;
  SubjectsNavigation: NavigatorScreenParams<SubjectsStackParamList>;
  InfoNavigation: NavigatorScreenParams<InfoStackParamList>;
};

export type SubjectsStackParamList = {
  Plan: undefined;
  Subject: { areaId: number };
  SubjectWebView: { url: string };
  SubjectFullPost: { post?: string };
};

export type InfoStackParamList = {
  Info: undefined;
  AboutEECommitte: undefined;
  SupportUs: undefined;
  ContactUs: undefined;
  Doctors: undefined;
  QuickLinkes: undefined;
};
