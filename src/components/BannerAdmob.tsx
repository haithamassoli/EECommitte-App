import { Platform, View } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

type Props = {
  position: "top" | "bottom";
};

const BannerAdmob = ({ position }: Props) => {
  const isAndroid = Platform.OS === "android";

  return (
    <>
      {isAndroid && (
        <View
          style={[
            {
              position: "absolute",
              zIndex: -10,
            },
            position === "top" ? { top: 0 } : { bottom: 0 },
          ]}
        >
          <BannerAd
            unitId={"ca-app-pub-6462207765068097/5461145128"}
            size={BannerAdSize.LARGE_BANNER}
          />
        </View>
      )}
    </>
  );
};

export default BannerAdmob;
