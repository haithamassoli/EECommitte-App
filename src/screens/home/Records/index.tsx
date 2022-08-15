import Colors from "@GlobalStyle/Colors";
import { View, Text, Image, Pressable } from "react-native";

const RecordsScreen = () => {
  return (
    <View
      style={{
        marginHorizontal: 12,
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <Image
          style={{
            width: 176,
            height: 100,
          }}
          source={require("@Assets/images/subjects/إقتصاد.png")}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            padding: 10,
            backgroundColor: Colors.lightGray,
            height: 100,
            marginStart: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Bukra",
            }}
          >
            إقتصاد
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Bukra",
            }}
          >
            المستوى: 1
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <Image
          style={{
            width: 176,
            height: 100,
          }}
          source={require("@Assets/images/subjects/إقتصاد.png")}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            padding: 10,
            backgroundColor: Colors.lightGray,
            height: 100,
            marginStart: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Bukra",
            }}
          >
            إقتصاد
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Bukra",
            }}
          >
            المستوى: 1
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default RecordsScreen;
