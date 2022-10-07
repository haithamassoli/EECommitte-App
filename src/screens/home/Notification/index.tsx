import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Falsy,
  RecursiveArray,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { fetchNotifications } from "@Src/api/fetchNotifications";
import {
  rtlWebview,
  screenHeight,
  screenWidth,
  storeDataToStorage,
  isConnected,
} from "@Utils/Helper";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { Feather } from "@expo/vector-icons";
import Accordion from "react-native-collapsible/Accordion";
const systemFonts = [...defaultSystemFonts, "Dubai"];

type NotificationType = {
  title: string;
  body: string;
  id: string;
};
type NonRegisteredStylesProp<T> = T | Falsy | RecursiveArray<T | Falsy>;
type StylesDictionary = {
  [tag: string]: NonRegisteredStylesProp<any>;
};

const NotificationScreen = () => {
  const [isConnecte, setIsConnecte] = useState<boolean | null>(true);
  const [activeSections, setActiveSections] = useState([]);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const { data, isLoading }: any = fetchNotifications();

  const tagsStyles: StylesDictionary = {
    body: {
      color: textColor,
      paddingHorizontal: horizontalScale(10),
      lineHeight: verticalScale(26),
      fontSize: moderateScale(18),
      fontFamily: "Dubai",
    },
    a: {
      color: theme === "light" ? Colors.primary700 : Colors.primary400,
    },
  };

  useEffect(() => {
    if (!data) {
      isConnected().then((isConnected) => {
        setIsConnecte(isConnected);
      });
    }
  }, []);

  useEffect(() => {
    const deleteNotificationsCount = async () => {
      await storeDataToStorage("notificationsCount", 0);
    };
    deleteNotificationsCount();
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
            fontSize: verticalScale(18),
            fontFamily: "Bukra",
            paddingHorizontal: horizontalScale(10),
            paddingVertical: verticalScale(6),
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
      <RenderHTML
        defaultTextProps={{ selectable: true }}
        contentWidth={screenWidth}
        baseStyle={{
          overflow: "hidden",
        }}
        source={{
          html: rtlWebview(section.body),
        }}
        tagsStyles={tagsStyles}
        systemFonts={systemFonts}
      />
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
  return (
    <ScrollView style={{ flex: 1, paddingTop: verticalScale(10) }}>
      {data.length === 0 && isConnecte && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: screenHeight,
          }}
        >
          <Text
            style={{
              fontFamily: "Bukra",
              fontSize: moderateScale(20),
              color: textColor,
              paddingBottom: verticalScale(180),
            }}
          >
            لا يوجد إشعارات
          </Text>
        </View>
      )}
      {isConnecte === false && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: screenHeight,
          }}
        >
          <Text
            style={{
              fontFamily: "Bukra",
              fontSize: moderateScale(20),
              color: textColor,
              paddingBottom: verticalScale(180),
            }}
          >
            لا يوجد اتصال بالانترنت
          </Text>
        </View>
      )}
      <Accordion
        sections={data}
        containerStyle={{
          paddingHorizontal: horizontalScale(16),
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
