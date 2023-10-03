import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Falsy,
  RecursiveArray,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import Colors from "@GlobalStyle/Colors";
import { useColorScheme } from "@Src/store/themeContext";
import { Feather } from "@expo/vector-icons";
import Accordion from "react-native-collapsible/Accordion";

type NotificationType = {
  title: string;
  body: string;
};

const NotificationScreen = () => {
  const [activeSections, setActiveSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setIsData] = useState<NotificationType[]>([]);
  const { theme } = useColorScheme();
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  useEffect(() => {
    setIsLoading(true);
    const deleteNotificationsCount = async () => {
      await storeDataToStorage("notificationsCount", 0);
      const notifications = await getDataFromStorage("notifications");
      if (notifications) {
        setIsData(notifications);
        console.log(notifications);
      }
    };
    deleteNotificationsCount();
    setIsLoading(false);
  }, []);

  const renderHeader = (section: NotificationType) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor:
            theme === "light" ? Colors.lightBackground : Colors.darkBackground,
          paddingHorizontal: horizontalScale(10),
          paddingVertical: verticalScale(10),
          borderRadius: 10,
          marginBottom: verticalScale(10),
        }}
      >
        <Text
          style={{
            color: textColor,
            fontSize: verticalScale(16),
            fontFamily: "TajawalBold",
            lineHeight: verticalScale(26),
            paddingLeft: horizontalScale(10),
            paddingVertical: verticalScale(6),
            textAlign: "left",
          }}
        >
          {section.title}
        </Text>
        <Feather
          name="chevron-down"
          size={verticalScale(20)}
          color={textColor}
        />
      </View>
    );
  };
  const renderContent = (section: NotificationType) => {
    return (
      <Text
        style={{
          textAlign: "left",
          fontFamily: "Dubai",
          color: textColor,
          fontSize: moderateScale(16),
        }}
      >
        {section.body}
      </Text>
    );
  };

  const updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
        size="large"
        color={theme === "light" ? Colors.primary700 : Colors.primary400}
      />
    );
  }
  if (Array.isArray(data) && data.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Bukra",
            fontSize: moderateScale(20),
            color: textColor,
          }}
        >
          لا يوجد اشعارات
        </Text>
      </ScrollView>
    );
  }
  return (
    <ScrollView style={{ flex: 1, paddingTop: verticalScale(10) }}>
      <Accordion
        sections={data}
        containerStyle={{
          paddingHorizontal: horizontalScale(16),
          paddingBottom: verticalScale(10),
        }}
        sectionContainerStyle={{
          backgroundColor:
            theme === "light"
              ? Colors.lightBackgroundSec
              : Colors.darkBackgroundSec,
          borderRadius: moderateScale(10),
          marginBottom: verticalScale(10),
          paddingHorizontal: horizontalScale(16),
          paddingVertical: verticalScale(10),
        }}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
        touchableComponent={TouchableOpacity}
      />
    </ScrollView>
  );
};

export default NotificationScreen;
