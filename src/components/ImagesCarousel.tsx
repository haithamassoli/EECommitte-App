import { useState, useRef, memo } from "react";
import { View, ScrollView, Image, ImageSourcePropType } from "react-native";
import { screenHeight, screenWidth } from "@Utils/Helper";
import { useEffect } from "react";
import Colors from "@GlobalStyle/Colors";
import { Shadow } from "react-native-shadow-2";

type Props = {
  images: ImageSourcePropType[];
};

const ImagesCarousel = ({ images }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      ),
        scrollRef.current?.scrollTo({
          animated: true,
          x: (screenWidth - 40) * selectedIndex,
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
    <View
      style={{
        width: screenWidth - 40,
        alignSelf: "center",
      }}
    >
      <Shadow
        distance={10}
        stretch
        style={{
          width: screenWidth - 40,
          height: screenHeight * 0.24,
          borderRadius: 12,
        }}
      >
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={setImageIndex}
          pagingEnabled
        >
          {images.map((image, index) => (
            <View
              key={index}
              style={{
                flex: 1,
              }}
            >
              <Image
                key={index}
                source={image}
                style={{
                  width: screenWidth - 40,
                  height: screenHeight * 0.24,
                  resizeMode: "cover",
                  borderRadius: 12,
                }}
              />
            </View>
          ))}
        </ScrollView>
      </Shadow>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
          position: "absolute",
          zIndex: 100,
          bottom: -24,
          left: screenWidth / 2 - 40,
        }}
      >
        {images.map((image, index) => (
          <View
            key={index}
            style={{
              height: 8,
              width: 8,
              borderRadius: 5,
              borderColor:
                index === selectedIndex ? Colors.primary600 : Colors.gray,
              borderWidth: 4,
              backgroundColor:
                index === selectedIndex ? Colors.primary600 : Colors.gray,
              margin: 4,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default memo(ImagesCarousel);
