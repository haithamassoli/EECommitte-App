import { useLayoutEffect } from "react";
import { Text, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import RenderHtml from "react-native-render-html";
import type { StackScreenProps } from "@react-navigation/stack";
import type { SubjectsStackParamList } from "../../types/navigation";
import { rtlWebview, screenWidth } from "../../utils/Helper";

type Props = StackScreenProps<SubjectsStackParamList, "SubjectFullPost">;

const SubjectFullPostScreen = ({ navigation, route }: Props) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "البوست الشامل",
    });
  }, []);
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingStart: 12,
        paddingVertical: 4,
        backgroundColor: "white",
      }}
    >
      {route?.params?.post ? (
        <>
          <RenderHtml
            contentWidth={screenWidth}
            source={{
              html: rtlWebview(route.params.post),
            }}
            // tagsStyles={{
            //   p: {
            //     fontSize: 18,
            //     lineHeight: 24,
            //     fontFamily: "Roboto",
            //     fontWeight: "normal",
            //     fontStyle: "normal",
            //     color: "#000000",
            //   },
            // }}
          />
          {/* <WebView
            minimumFontSize={72}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            originWhitelist={["*"]}
            source={{
              html: rtlWebview(route?.params?.post),
            }}
          /> */}
        </>
      ) : (
        <Text>لا يوجد يوست شامل حاليًا</Text>
      )}
    </ScrollView>
  );
};

export default SubjectFullPostScreen;
