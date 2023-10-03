import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useState } from "react";
import Colors from "@GlobalStyle/Colors";
import { useColorScheme } from "@Src/store/themeContext";

import Accordion from "react-native-collapsible/Accordion";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
  vs,
} from "@Utils/Platform";
import { Feather } from "@expo/vector-icons";
import { fetchFAQ } from "@Src/api/fetchFAQ";
import { rtlWebview, screenWidth } from "@Utils/Helper";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import NoConnection from "@Components/NoConnection";
import Animated, { FadeInUp } from "react-native-reanimated";
type SECTIONSTYPE = { title: string; content: string };
const systemFonts = [...defaultSystemFonts, "Dubai"];

const FAQScreen = () => {
  const { theme } = useColorScheme();
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const [activeSections, setActiveSections] = useState([]);
  const [refetchCounter, setRefetchCounter] = useState(0);
  const { data, isLoading, isFetching }: any = fetchFAQ(refetchCounter);

  const tagsStyles: any = {
    body: {
      color: textColor,
      textAlign: "left",
      paddingLeft: horizontalScale(10),
      lineHeight: verticalScale(32),
      fontSize: moderateScale(16),
      fontFamily: "Dubai",
    },
    a: {
      color: theme === "light" ? Colors.primary700 : Colors.primary400,
    },
  };
  const renderHeader = (
    section: SECTIONSTYPE,
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
          borderRadius: moderateScale(10),
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
  const renderContent = (section: SECTIONSTYPE) => {
    return (
      <Animated.View entering={FadeInUp.duration(600)}>
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
            html: rtlWebview(section.content),
          }}
          tagsStyles={tagsStyles}
          systemFonts={systemFonts}
        />
      </Animated.View>
    );
  };

  const updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
  };
  const handleRefetch = () => {
    setRefetchCounter(0);
    setRefetchCounter((prev) => prev + 1);
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
    return <NoConnection refetch={handleRefetch} />;
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

export default FAQScreen;
