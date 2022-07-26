import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../styles/Colors";
import SearchInput from "../../components/ui/SearchInput";

const { height } = Dimensions.get("window");

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput />
      </View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Popular</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
          flexWrap: "wrap",
        }}
      >
        <Text
          style={{
            paddingVertical: 7,
            paddingHorizontal: 20,
            marginRight: 10,
            marginTop: 10,
            backgroundColor: Colors.grayLight,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.gray,
          }}
        >
          Pizza
        </Text>
        <Text
          style={{
            paddingVertical: 7,
            paddingHorizontal: 20,
            marginRight: 10,
            marginTop: 10,
            backgroundColor: Colors.grayLight,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.gray,
          }}
        >
          Pizza
        </Text>
        <Text
          style={{
            paddingVertical: 7,
            paddingHorizontal: 20,
            marginRight: 10,
            marginTop: 10,
            backgroundColor: Colors.grayLight,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.gray,
          }}
        >
          Pizza
        </Text>
        <Text
          style={{
            paddingVertical: 7,
            paddingHorizontal: 20,
            marginRight: 10,
            marginTop: 10,
            backgroundColor: Colors.grayLight,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.gray,
          }}
        >
          Pizza
        </Text>
        <Text
          style={{
            paddingVertical: 7,
            paddingHorizontal: 20,
            marginRight: 10,
            marginTop: 10,
            backgroundColor: Colors.grayLight,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.gray,
          }}
        >
          Pizza
        </Text>
        <Text
          style={{
            paddingVertical: 7,
            paddingHorizontal: 20,
            marginRight: 10,
            marginTop: 10,
            backgroundColor: Colors.grayLight,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.gray,
          }}
        >
          Pizza
        </Text>
        <Text
          style={{
            paddingVertical: 7,
            paddingHorizontal: 20,
            marginRight: 10,
            marginTop: 10,
            backgroundColor: Colors.grayLight,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.gray,
          }}
        >
          Pizza
        </Text>
        <Text
          style={{
            paddingVertical: 7,
            paddingHorizontal: 20,
            marginRight: 10,
            marginTop: 10,
            backgroundColor: Colors.grayLight,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.gray,
          }}
        >
          Pizza
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Search History</Text>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: Colors.primary }}
        >
          Clear All
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="search" size={20} color="black" />
          <Text style={{ fontSize: 16, marginLeft: 5 }}>
            Lorem ipsum dolor sit
          </Text>
        </View>
        <Ionicons name="close" size={20} color="black" />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="search" size={20} color="black" />
          <Text style={{ fontSize: 16, marginLeft: 5 }}>
            Lorem ipsum dolor sit
          </Text>
        </View>
        <Ionicons name="close" size={20} color="black" />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="search" size={20} color="black" />
          <Text style={{ fontSize: 16, marginLeft: 5 }}>
            Lorem ipsum dolor sit
          </Text>
        </View>
        <Ionicons name="close" size={20} color="black" />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="search" size={20} color="black" />
          <Text style={{ fontSize: 16, marginLeft: 5 }}>
            Lorem ipsum dolor sit
          </Text>
        </View>
        <Ionicons name="close" size={20} color="black" />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: height / 8,
  },
});