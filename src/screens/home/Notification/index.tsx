import { View, Text, ScrollView } from "react-native";
import { useLayoutEffect, useEffect, useState, useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "@Types/navigation";
import { fetchNotifications } from "@Src/api/fetchNotifications";
import { storeDataToStorage } from "@Utils/Helper";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";

type Props = StackScreenProps<HomeStackParamList, "Notification">;

type NotificationType = {
  title: string;
  body: string;
};

const NotificationScreen = ({ navigation }: Props) => {
  const [notification, setNotification] = useState<NotificationType[]>([]);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const backgroundColor =
    theme === "light" ? Colors.lightBackgroundSec : Colors.darkBackgroundSec;
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
      .then((res: any) => {
        console.log(res);
        setNotification(res);
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
    <ScrollView
      style={{
        flex: 1,
        paddingVertical: verticalScale(10),
        paddingHorizontal: horizontalScale(10),
      }}
    >
      {notification.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor,
            paddingVertical: verticalScale(12),
            paddingHorizontal: horizontalScale(12),
            borderRadius: moderateScale(16),
            marginBottom: verticalScale(18),
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "Bukra",
              fontSize: moderateScale(20),
              color: textColor,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontFamily: "TajawalMedium",
              fontSize: moderateScale(16),
              color: textColor,
            }}
          >
            {item.body}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default NotificationScreen;
