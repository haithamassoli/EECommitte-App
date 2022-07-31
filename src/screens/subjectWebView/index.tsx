import { View } from "react-native";
import { WebView } from "react-native-webview";
import type { StackScreenProps } from "@react-navigation/stack";
import type { SubjectsStackParamList } from "../../types/navigation";

type Props = StackScreenProps<SubjectsStackParamList, "SubjectWebView">;

const SubjectWebViewScreen = ({ route }: Props) => {

  return (
    <View
      style={{
        flex: 1,
        paddingStart: 12,
        paddingVertical: 4,
        backgroundColor: "white",
      }}
    >
        <WebView
          minimumFontSize={72}
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
