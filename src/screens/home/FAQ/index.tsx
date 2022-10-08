import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import Accordion from "react-native-collapsible/Accordion";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { Feather } from "@expo/vector-icons";
import { fetchFAQ } from "@Src/api/fetchFAQ";
import {
  screenHeight,
  isConnected,
  rtlWebview,
  screenWidth,
} from "@Utils/Helper";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import NoConnectoin from "@Components/noConnectoin";
type SECTIONSTYPE = { title: string; content: string };
const systemFonts = [...defaultSystemFonts, "Dubai"];

const FAQScreen = () => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const [isConnecte, setIsConnecte] = useState<boolean | null>(true);
  const [activeSections, setActiveSections] = useState([]);
  const { data, isLoading }: any = fetchFAQ();

  useEffect(() => {
    if (!data) {
      isConnected().then((isConnected) => {
        setIsConnecte(isConnected);
      });
    }
  }, []);

  const tagsStyles: any = {
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
  const renderHeader = (section: SECTIONSTYPE) => {
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
  const renderContent = (section: SECTIONSTYPE) => {
    return (
      <RenderHTML
        defaultTextProps={{ selectable: true }}
        contentWidth={screenWidth}
        baseStyle={{
          overflow: "hidden",
        }}
        source={{
          html: rtlWebview(section.content),
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
  if (isConnecte === false) {
    return <NoConnectoin />;
  }
  return (
    <ScrollView style={{ flex: 1, paddingTop: verticalScale(10) }}>
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

export default FAQScreen;
