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
import NetInfo from "@react-native-community/netinfo";
import { fetchNotifications } from "@Src/api/fetchNotifications";
import { rtlWebview, screenWidth, storeDataToStorage } from "@Utils/Helper";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { Feather } from "@expo/vector-icons";
import Accordion from "react-native-collapsible/Accordion";
import NoConnection from "@Components/NoConnection";
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
  const [isConnected, setIsConnected] = useState<boolean | null>();
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const { data, isLoading, refetch, isFetching }: any =
    fetchNotifications(refetchCounter);

  const tagsStyles: StylesDictionary = {
    body: {
      color: textColor,
      paddingLeft: horizontalScale(10),
      lineHeight: verticalScale(32),
      fontSize: moderateScale(16),
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
      const connectionStatus = await NetInfo.fetch();
      setIsConnected(connectionStatus.isConnected);
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
      <RenderHTML
        defaultTextProps={{
          selectable: true,
          allowFontScaling: false,
          selectionColor:
            theme === "light" ? Colors.primary400 : Colors.primary700,
        }}
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
  const handleRefetch = async () => {
    await refetch();
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
  if (Array.isArray(data) && data.length === 0 && isConnected === false) {
    return <NoConnection refetch={handleRefetch} />;
  }
  if (Array.isArray(data) && data.length === 0 && isConnected === true) {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              if (refetchCounter === 0) {
                setRefetchCounter(1);
              }
            }}
            colors={
              theme === "light" ? [Colors.primary700] : [Colors.primary400]
            }
            progressBackgroundColor={
              theme === "light"
                ? Colors.lightBackgroundSec
                : Colors.darkBackgroundSec
            }
            tintColor={
              theme === "light" ? Colors.primary700 : Colors.primary400
            }
          />
        }
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
          colors={theme === "light" ? [Colors.primary700] : [Colors.primary400]}
          progressBackgroundColor={
            theme === "light"
              ? Colors.lightBackgroundSec
              : Colors.darkBackgroundSec
          }
          tintColor={theme === "light" ? Colors.primary700 : Colors.primary400}
        />
      }
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
    </ScrollView>
  );
};

export default NotificationScreen;
