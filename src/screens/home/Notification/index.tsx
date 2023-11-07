import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import { dateFromNow, getDataMMKV, storeDataMMKV } from "@Utils/Helper";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
  vs,
} from "@Utils/Platform";
import Colors from "@GlobalStyle/Colors";
import { useColorScheme } from "@Src/store/themeContext";
import { Feather } from "@expo/vector-icons";
import Accordion from "react-native-collapsible/Accordion";
import Animated, { FadeInUp } from "react-native-reanimated";

type NotificationType = {
  title: string;
  body: string;
  link?: string;
  date: Date;
};

const NotificationScreen = () => {
  const [activeSections, setActiveSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setIsData] = useState<NotificationType[]>([]);
  const { theme } = useColorScheme();
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  useEffect(() => {
    setIsLoading(true);
    const deleteNotificationsCount = () => {
      storeDataMMKV("notificationsCount", 0);
      const notifications = getDataMMKV("notifications");
      if (notifications) {
        setIsData(notifications);
      }
    };
    deleteNotificationsCount();
    setIsLoading(false);
  }, []);

  const renderHeader = (
    section: NotificationType,
    index: number,
    isActive: boolean
  ) => {
    return (
      <Animated.View
        entering={FadeInUp.withInitialValues({
          transform: [
            {
              translateY: vs(125),
            },
          ],
        })
          .duration(600)
          .delay(index * 200 + 200)}
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
        <View>
          <Text
            style={{
              color: textColor,
              fontSize: verticalScale(16),
              fontFamily: "TajawalBold",
              paddingLeft: horizontalScale(10),
              paddingTop: verticalScale(6),
              textAlign: "left",
            }}
          >
            {section.title}
          </Text>
          <Text
            style={{
              color: textColor,
              fontSize: verticalScale(12),
              fontFamily: "TajawalMedium",
              paddingVertical: verticalScale(6),
              paddingLeft: horizontalScale(10),
              textAlign: "left",
            }}
          >
            {dateFromNow(section.date)}
          </Text>
        </View>
        <Feather
          name="chevron-down"
          size={verticalScale(20)}
          color={textColor}
          style={{
            transform: [
              {
                rotate: isActive ? "180deg" : "0deg",
              },
            ],
          }}
        />
      </Animated.View>
    );
  };
  const renderContent = (section: NotificationType) => {
    return (
      <>
        <Animated.Text
          entering={FadeInUp.duration(600)}
          style={{
            textAlign: "left",
            fontFamily: "Dubai",
            color: textColor,
            fontSize: moderateScale(16),
          }}
        >
          {section.body}
        </Animated.Text>
        {section.link && (
          <TouchableOpacity onPress={() => Linking.openURL(section.link!)}>
            <Animated.Text
              entering={FadeInUp.duration(600)}
              style={{
                textAlign: "left",
                fontFamily: "Dubai",
                color:
                  theme === "light" ? Colors.primary700 : Colors.primary400,
                fontSize: moderateScale(16),
              }}
            >
              {section.link}
            </Animated.Text>
          </TouchableOpacity>
        )}
      </>
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
      <Animated.View
        entering={FadeInUp.withInitialValues({
          transform: [
            {
              translateY: vs(325),
            },
          ],
        }).duration(600)}
      >
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
      </Animated.View>
    </ScrollView>
  );
};

export default NotificationScreen;
