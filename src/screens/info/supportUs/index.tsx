import { View, Button, Text } from "react-native";
import { AdMobRewarded } from "expo-ads-admob";
import { useEffect } from "react";
import { Feather } from "@expo/vector-icons";

const SupportUsScreen = () => {
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
        }}
      >
        أشكرك لمجرد وصولك إلى هنا لدعمي أحتاج دعوتك الجميلة فقط :)
      </Text>
      <Feather
        name="heart"
        size={270}
        color="#e74c3c"
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default SupportUsScreen;
