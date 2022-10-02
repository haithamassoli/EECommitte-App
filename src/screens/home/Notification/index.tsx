import { View, Text } from "react-native";
import { useLayoutEffect, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "@Types/navigation";
import { fetchNotifications } from "@Src/api/fetchNotifications";
import { storeDataToStorage } from "@Utils/Helper";

type Props = StackScreenProps<HomeStackParamList, "Notification">;

const NotificationScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "الاشعارات",
      headerTitleStyle: {
        fontFamily: "Bukra",
      },
    });
  }, []);
  useEffect(() => {
    fetchNotifications()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    const deleteNotificationsCount = async () => {
      await storeDataToStorage("notificationsCount", 0);
    };
    deleteNotificationsCount();
  }, []);
  return (
    <View>
      <Text>notificationScreen</Text>
    </View>
  );
};

export default NotificationScreen;
