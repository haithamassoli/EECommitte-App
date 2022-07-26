import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { screenHeight, screenWidth } from "../utils/Helper";

class ImageMapper extends Component {
  buildStyle(item: any, index: any) {
    const { x1, y1, x2, y2, width, height, shape, fill, prefill, id, radius } =
      item;
    const { selectedAreaId, multiselect = false }: any = this.props;
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
    };
    if (prefill !== null && prefill !== undefined) {
      if ((multiselect && !areaId.includes(id)) || id !== areaId) {
        // @ts-ignore
        style.backgroundColor = prefill;
      }
    }
    if (fill !== null && fill !== undefined) {
      if ((multiselect && areaId.includes(id)) || id === areaId) {
        // @ts-ignore
        style.backgroundColor = fill;
      }
    }
    if (shape === "rectangle") {
      style.width = width === null || width === undefined ? x2 - x1 : width;
      style.height = height === null || height === undefined ? y2 - y1 : height;
    }
    if (shape === "circle") {
      style.width = radius;
      style.height = radius;
      // @ts-ignore
      style.borderRadius = radius / 2;
    }
    return style;
  }

  render() {
    const { imgHeight, imgWidth, imgSource, imgMap, containerStyle }: any =
      this.props;
    return (
      <View style={[{ flex: 1 }, containerStyle]}>
        <ImageBackground
          style={{ height: imgHeight || screenHeight, width: imgWidth || screenWidth }}
          source={imgSource}
          resizeMode="contain"
        >
          {imgMap.map((item: any, index: any) => (
            <TouchableOpacity
              key={item.id}
              // @ts-ignore
              onPress={(event) => this.props.onPress(item, index, event)}
              // style={[{ position: "absolute" }, this.buildStyle(item, index)]}
            />
          ))}
        </ImageBackground>
      </View>
    );
  }
}

export default ImageMapper;
