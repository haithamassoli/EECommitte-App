import { NavigatorScreenParams } from "@react-navigation/native";

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  SubjectsNavigation: NavigatorScreenParams<SubjectsStackParamList>;
  InfoNavigation: undefined;
};

export type SubjectsStackParamList = {
  Plan: undefined;
  Subject: { areaId: number };
  SubjectWebView: { url: string };
  SubjectFullPost: { postId: number };
};
