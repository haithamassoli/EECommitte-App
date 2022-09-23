import { ActivityIndicator, Alert, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import type { StackScreenProps } from "@react-navigation/stack";
import type { SubjectsStackParamList } from "@Types/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { isConnected } from "@Utils/Helper";
import Colors from "@GlobalStyle/Colors";
import { verticalScale } from "@Utils/Platform";

type Props = StackScreenProps<SubjectsStackParamList, "SubjectWebView">;

const SubjectWebViewScreen = ({ navigation, route }: Props) => {
  const [isConnecte, setIsConnecte] = useState<boolean | null>(false);
  const [loading, setLoading] = useState(true);
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

  // if (loading) {
  //   return (
  //     <ActivityIndicator style={{ flex: 1 }} size="large" color={Colors.gray} />
  //   );
  // }

  return (
    <>
      {loading && (
        <ActivityIndicator
          style={{
            flex: 1,
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 1,
            margin: -20,
          }}
          size="large"
          color={Colors.gray}
        />
      )}

      <View
        style={{
          flex: 1,
          paddingVertical: verticalScale(4),
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
            onLoadEnd={() => {
              setLoading(false);
            }}
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
            }}
          >
            <Text>لا يوجد اتصال بالانترنت</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default SubjectWebViewScreen;
