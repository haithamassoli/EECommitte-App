import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Falsy,
  RecursiveArray,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { fetchNotifications } from "@Src/api/fetchNotifications";
import { rtlWebview, screenWidth, storeDataToStorage } from "@Utils/Helper";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { Feather } from "@expo/vector-icons";
import Accordion from "react-native-collapsible/Accordion";
import NoConnection from "@Components/NoConnection";
import BannerAdmob from "@Components/BannerAdmob";
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
  const [activeSections, setActiveSections] = useState([]);
  const [refetchCounter, setRefetchCounter] = useState(0);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const { data, isLoading, refetch, isFetching }: any =
    fetchNotifications(refetchCounter);

  const tagsStyles: StylesDictionary = {
    body: {
      color: textColor,
      paddingHorizontal: horizontalScale(10),
      lineHeight: verticalScale(26),
      fontSize: moderateScale(18),
      fontFamily: "Dubai",
      textAlign: "left",
    },
    a: {
      color: theme === "light" ? Colors.primary700 : Colors.primary400,
    },
  };

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
        <BannerAdmob position="top" />
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
        defaultTextProps={{ selectable: true, allowFontScaling: false }}
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
  if (Array.isArray(data) && data.length === 0) {
    return <NoConnection refetch={refetch} />;
  }
  return (
    <ScrollView
      style={{ flex: 1, paddingTop: verticalScale(10) }}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={() => {
            if (refetchCounter === 0) {
              setRefetchCounter(1);
            }
          }}
        />
      }
    >
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
      <BannerAdmob position="bottom" />
    </ScrollView>
  );
};

export default NotificationScreen;
