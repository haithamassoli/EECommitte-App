import React, { Component, memo } from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import type { MapperItem } from "@Types/index";
import { blurhash, screenHeight, screenWidth } from "@Utils/Helper";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { ImageBackground } from "expo-image";
import { Feather } from "@expo/vector-icons";

type Props = {
  selectedAreaId?: number[] | number;
  multiselect?: boolean;
  imgHeight: number;
  imgWidth: number;
  imgMap: MapperItem[];
  containerStyle?: StyleProp<ViewStyle>;
  imgSource: ImageSourcePropType;
  onPress: (
    item: MapperItem,
    index: number,
    event: GestureResponderEvent
  ) => void;
};

class ImageMapper extends Component<Props> {
  state = {
    loading: true,
  };
  buildStyle(item: MapperItem, index: number) {
    const { x1, y1, x2, y2, width, height, shape, fill, prefill, id, radius } =
      item;
    const { selectedAreaId, multiselect = false } = this.props;
    let areaId = selectedAreaId;
    if (
      multiselect &&
      (selectedAreaId === null || selectedAreaId === undefined)
    ) {
      areaId = [];
    }
    const style = {
      width: 0,
      height: 0,
      left: x1,
      top: y1,
      backgroundColor: "transparent",
      borderRadius: moderateScale(0),
    };
    if (prefill !== null && prefill !== undefined) {
      if (
        (multiselect &&
          areaId != undefined &&
          Array.isArray(areaId) &&
          !areaId.includes(id)) ||
        id !== areaId
      ) {
        style.backgroundColor = prefill;
      }
    }
    if (fill !== null && fill !== undefined) {
      if (
        (multiselect &&
          areaId != undefined &&
          Array.isArray(areaId) &&
          areaId.includes(id)) ||
        id === areaId
      ) {
        style.backgroundColor = fill;
      }
    }
    if (shape === "rectangle") {
      style.width =
        width === null || width === undefined
          ? horizontalScale(x2 - x1)
          : horizontalScale(width);
      style.height =
        height === null || height === undefined
          ? verticalScale(y2 - y1)
          : verticalScale(height);
    }
    if (shape === "circle" && radius !== undefined) {
      style.width = horizontalScale(radius);
      style.height = horizontalScale(radius);
      style.borderRadius = horizontalScale(radius / 2);
    }
    return style;
  }

  render() {
    const { imgHeight, imgWidth, imgSource, imgMap, containerStyle } =
      this.props;
    return (
      <View style={[{ flex: 1 }, containerStyle]}>
        <ImageBackground
          style={{
            height: imgHeight || screenHeight,
            width: imgWidth || screenWidth,
          }}
          onLoadEnd={() => this.setState({ loading: false })}
          source={imgSource}
          placeholder={blurhash}
          placeholderContentFit="cover"
          contentFit="contain"
          transition={400}
        >
          {imgMap.map((item: MapperItem, index: number) => (
            <Pressable
              key={item.id}
              onPress={(event) => this.props.onPress(item, index, event)}
              style={[{ position: "absolute" }, this.buildStyle(item, index)]}
            >
              {item.isFinished && (
                <Feather
                  name="check"
                  size={moderateScale(16)}
                  color="black"
                  style={{
                    alignSelf: "center",
                    top: verticalScale(moderateScale(item?.radius!) / 3.7),
                  }}
                />
              )}
            </Pressable>
          ))}
        </ImageBackground>
      </View>
    );
  }
}

export default memo(ImageMapper);
