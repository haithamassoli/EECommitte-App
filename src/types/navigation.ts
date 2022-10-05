import { NavigatorScreenParams } from "@react-navigation/native";

export type BottomTabParamList = {
  HomeNavigation: NavigatorScreenParams<HomeStackParamList>;
  News: undefined;
  SubjectsNavigation: NavigatorScreenParams<SubjectsStackParamList>;
  InfoNavigation: NavigatorScreenParams<InfoStackParamList>;
};

export type SubjectsStackParamList = {
  Plan: undefined;
  Subject: { subjectId: number; from?: string };
  SubjectFullPost: { post?: string; postTitle: string; from?: string };
};

export type InfoStackParamList = {
  Info: undefined;
  AboutEECommitte: undefined;
  SupportUs: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Calculator: undefined;
  Doctors: { doctorId?: number };
  Search: { backTo?: string; from?: string };
  Records: undefined;
  OurExplanations: undefined;
  Favorite: undefined;
  FAQ: undefined;
  Registration: undefined;
  Notification: undefined;
  SubjectName: undefined;
};
