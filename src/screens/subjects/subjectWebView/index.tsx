import { Alert, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import type { StackScreenProps } from "@react-navigation/stack";
import type { SubjectsStackParamList } from "@Types/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { isConnected } from "@Utils/Helper";

type Props = StackScreenProps<SubjectsStackParamList, "SubjectWebView">;

const SubjectWebViewScreen = ({ navigation, route }: Props) => {
  const [isConnecte, setIsConnecte] = useState<boolean | null>(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "درايف المادة",
    });
  }, []);

  useEffect(() => {
    isConnected().then((isConnected) => {
      setIsConnecte(isConnected);
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
      {isConnecte ? (
        <WebView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          onError={(error) => {
            Alert.alert(
              "خطأ",
              "حدث خطأ أثناء تحميل الموقع",
              [{ text: "حسنا" }],
              { cancelable: false }
            );
          }}
          originWhitelist={["*"]}
          source={{
            uri: route.params.url,
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Text>لا يوجد اتصال بالانترنت</Text>
        </View>
      )}
    </View>
  );
};

export default SubjectWebViewScreen;
