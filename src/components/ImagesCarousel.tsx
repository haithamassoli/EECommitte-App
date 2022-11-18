import { useState, useRef, memo, useContext } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { screenHeight, screenWidth } from "@Utils/Helper";
import { useEffect } from "react";
import Colors from "@GlobalStyle/Colors";
import { Shadow } from "react-native-shadow-2";
import { ThemeContext } from "@Src/store/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";

type Props = {
  images: any[];
};

const ImagesCarousel = ({ images }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const { theme } = useContext(ThemeContext);
  const shadowColor =
    theme === "light" ? "rgba(34, 34, 34, 0.18)" : "rgba(255, 255, 255, 0.34)";
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      ),
        scrollRef.current?.scrollTo({
          animated: true,
          x: (screenWidth - horizontalScale(40)) * selectedIndex,
          y: 0,
        });
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedIndex]);

  const setImageIndex = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    setSelectedIndex(selectedIndex);
  };

  return (
    <View style={styles.container}>
      <Shadow
        distance={8}
        stretch
        startColor={shadowColor}
        endColor="rgba(0, 0, 0, 0)"
        style={styles.shadow}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            flexDirection: "row-reverse",
          }}
          horizontal
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={setImageIndex}
          pagingEnabled
        >
          {images.length === 0 && (
            <Image
              source={require("@Assets/images/slider1.webp")}
              style={styles.image}
            />
          )}
          {images.map((image, index) => (
            <TouchableOpacity
              onPress={() => {
                if (image.url) {
                  Linking.openURL(image?.url);
                }
              }}
              key={index}
              activeOpacity={image.url ? 0.5 : 1}
            >
              <Image
                source={{ uri: image?.image }}
                defaultSource={require("@Assets/images/slider1.webp")}
                style={styles.image}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Shadow>
      <View style={styles.dotsContainer}>
        {images.length === 0 && (
          <View
            style={[
              styles.dot,
              {
                borderColor:
                  theme === "light" ? Colors.primary700 : Colors.primary400,
              },
            ]}
          />
        )}
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                borderColor:
                  index === images.length - selectedIndex - 1
                    ? theme === "light"
                      ? Colors.primary700
                      : Colors.primary400
                    : images.length === 1
                    ? theme === "light"
                      ? Colors.primary700
                      : Colors.primary400
                    : Colors.gray,
                backgroundColor:
                  index === selectedIndex ? Colors.primary600 : Colors.gray,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default memo(ImagesCarousel);

const styles = StyleSheet.create({
  container: {
    width: screenWidth - horizontalScale(40),
    alignSelf: "center",
    height: verticalScale(182),
  },
  shadow: {
    width: screenWidth - horizontalScale(40),
    height: screenHeight * 0.24,
    borderRadius: moderateScale(12),
  },
  image: {
    width: screenWidth - horizontalScale(40),
    height: screenHeight * 0.24,
    resizeMode: "cover",
    borderRadius: moderateScale(12),
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: verticalScale(10),
    zIndex: 100,
  },
  dot: {
    height: verticalScale(8),
    width: verticalScale(8),
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(4),
    margin: moderateScale(4),
    backgroundColor: Colors.primary600,
  },
});
