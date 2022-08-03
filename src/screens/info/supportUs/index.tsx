import { View, Button } from "react-native";
import { AdMobRewarded } from "expo-ads-admob";
import { useEffect } from "react";

const SupportUsScreen = () => {
  
  useEffect(() => {
    return function cleanup() {
      AdMobRewarded.removeAllListeners();
    };
  }, []);

  const loadAd = async() => {
    await AdMobRewarded.setAdUnitID("ca-app-pub-6462207765068097/2318772812");
    await AdMobRewarded.requestAdAsync();
  }

  AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", (reward) => {
    console.log(reward);
    loadAd();
  });

  AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () => {
    loadAd();
  });

  AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
    loadAd();
  })

  loadAd();
  return (
    <View style={{flex:1}}>
      <Button title='Show Reward Ad' onPress={() => { AdMobRewarded.showAdAsync() }} />
    </View>
  );
};

export default SupportUsScreen;
