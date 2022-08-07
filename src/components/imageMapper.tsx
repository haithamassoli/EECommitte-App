import React, { Component } from "react";
import {
  ImageBackground,
  View,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import type { MapperItem } from "@Types/index";
import { screenHeight, screenWidth } from "@Utils/Helper";
const thumbnail = require("@Assets/images/thumbnailPlan.gif");
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
      borderRadius: 0,
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
      style.width = width === null || width === undefined ? x2 - x1 : width;
      style.height = height === null || height === undefined ? y2 - y1 : height;
    }
    if (shape === "circle" && radius !== undefined) {
      style.width = radius;
      style.height = radius;
      style.borderRadius = radius / 2;
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
          source={this.state.loading === true ? thumbnail : imgSource}
          fadeDuration={1000}
          resizeMode="contain"
        >
          {imgMap.map((item: MapperItem, index: number) => (
            <Pressable
              key={item.id}
              onPress={(event) => this.props.onPress(item, index, event)}
              style={[{ position: "absolute" }, this.buildStyle(item, index)]}
            />
          ))}
        </ImageBackground>
      </View>
    );
  }
}

export default ImageMapper;
