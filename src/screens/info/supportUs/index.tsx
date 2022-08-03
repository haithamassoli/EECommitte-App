import { View, Text } from "react-native";
import { AdMobRewarded } from "expo-ads-admob";

const SupportUsScreen = () => {
  
  const loadAd = async() => {
    await AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/1033173712");
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  }
  return (
    <View>
      <Text>AboutUni</Text>
    </View>
  );
};

export default SupportUsScreen;
