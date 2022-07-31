import { View } from "react-native";
import { WebView } from "react-native-webview";
import type { StackScreenProps } from "@react-navigation/stack";
import type { SubjectsStackParamList } from "../../../types/navigation";
import { useLayoutEffect } from "react";

type Props = StackScreenProps<SubjectsStackParamList, "SubjectWebView">;

const SubjectWebViewScreen = ({ navigation, route }: Props) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "درايف المادة",
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 4,
        backgroundColor: "white",
      }}
    >
      <WebView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        originWhitelist={["*"]}
        source={{
          uri: route.params.url,
        }}
      />
    </View>
  );
};

export default SubjectWebViewScreen;
