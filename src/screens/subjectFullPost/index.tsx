import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import type { StackScreenProps } from "@react-navigation/stack";
import type { SubjectsStackParamList } from "../../types/navigation";
import { rtlWebview } from "../../utils/Helper";

type Props = StackScreenProps<SubjectsStackParamList, "SubjectFullPost">;

const SubjectFullPostScreen = ({ navigation, route }: Props) => {

  return (
    <View
      style={{
        flex: 1,
        paddingStart: 12,
        paddingVertical: 4,
        backgroundColor: "white",
      }}
    >
      {route?.params?.post ? (
        <WebView
          minimumFontSize={72}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          originWhitelist={["*"]}
          source={{
            html: rtlWebview(route?.params?.post ),
          }}
        />
      ) : (
        <Text>لا يوجد يوست شامل حاليًا</Text>
      )}
    </View>
  );
};

export default SubjectFullPostScreen;
