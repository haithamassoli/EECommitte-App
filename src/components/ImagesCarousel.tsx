import { useState, memo } from "react";
import { Image } from "expo-image";
import Carousel from "react-native-reanimated-carousel";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { blurhash, screenWidth } from "@Utils/Helper";
import { hs, ms, vs } from "@Utils/Platform";
import { View } from "react-native";
import Colors from "@GlobalStyle/Colors";

type Props = {
  images: string[];
};

const ImagesCarousel = ({ images }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <Carousel
        width={screenWidth}
        height={screenWidth / 2}
        autoPlay={true}
        data={images!}
        autoPlayInterval={3000}
        autoPlayReverse
        onSnapToItem={setSelectedIndex}
        renderItem={({ item }) => (
          <Image
            source={item}
            transition={400}
            style={{
              width: screenWidth - hs(32),
              height: screenWidth / 2,
              borderRadius: ms(10),
            }}
            contentFit="cover"
            placeholder={blurhash}
            placeholderContentFit="cover"
          />
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: vs(8),
        }}
      >
        {images.map((_, index) => (
          <Animated.View
            key={index}
            layout={SlideInLeft.withInitialValues({
              originX: 0,
            })}
          >
            <View
              style={{
                height: ms(8),
                borderRadius: ms(8),
                marginHorizontal: hs(4),
                marginVertical: vs(4),
                backgroundColor:
                  index === images.length - selectedIndex - 1
                    ? Colors.primary600
                    : Colors.gray,
                width:
                  index === images.length - selectedIndex - 1 ? ms(24) : ms(8),
              }}
            />
          </Animated.View>
        ))}
      </View>
    </>
  );
};

export default memo(ImagesCarousel);
