import { View, Button, Text } from "react-native";
import { AdMobRewarded } from "expo-ads-admob";
import { useContext, useEffect } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "@Src/store/themeContext";

const SupportUsScreen = () => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? "#000" : "#fff";
  useEffect(() => {
    return function cleanup() {
      AdMobRewarded.removeAllListeners();
    };
  }, []);

  const loadAd = async () => {
    await AdMobRewarded.setAdUnitID("ca-app-pub-6462207765068097/2318772812");
    await AdMobRewarded.requestAdAsync();
  };

  AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", (reward) => {
    console.log(reward);
    loadAd();
  });

  AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () => {
    loadAd();
  });

  AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
    loadAd();
  });

  loadAd();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Show Reward Ad"
        onPress={() => {
          AdMobRewarded.showAdAsync();
        }}
      />
      <Text
        style={{
          fontFamily: "Bukra",
          fontSize: 20,
          textAlign: "center",
          marginTop: 20,
          color: textColor,
        }}
      >
        شكراً لوصولك هنا
      </Text>
      <Text
        style={{
          fontFamily: "TajawalRegular",
          fontSize: 18,
          textAlign: "center",
          marginTop: 8,
          color: textColor,
        }}
      >
        أشكرك لمجرد وصولك إلى هنا لدعمي أحتاج دعوتك الجميلة فقط :)
      </Text>
      <Ionicons
        name="heart"
        size={270}
        color="#e74c3c"
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default SupportUsScreen;
