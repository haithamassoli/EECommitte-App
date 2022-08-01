import { useEffect, useState, useRef } from "react";
import { View, Image, ScrollView, Text, Alert } from "react-native";
import { WebView } from "react-native-webview";
import RenderHtml from "react-native-render-html";
import {
  isConnected,
  rtlWebview,
  screenHeight,
  screenWidth,
} from "@Utils/Helper";
import { db } from "@Src/firebase-config";
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   startAt,
// } from "firebase/firestore";
import styles from "./styles";
import { Post } from "@Types/index";

const HomeScreen = () => {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [isConnecte, setIsConnecte] = useState<boolean | null>(false);

  // const postsCollectionRef = collection(db, "posts");

  // useEffect(() => {
  //   getPosts();
  //   isConnected().then((isConnected) => {
  //     setIsConnecte(isConnected);
  //   });
  // }, []);

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  // const getPosts = async () => {
  //   if (isLoading || isEnd) return;
  //   setIsLoading(true);
  //   // @ts-ignore
  //   const paginatedPosts = await getDocs(postsCollectionRef, {
  //     orderBy: orderBy("createdAt", "desc"),
  //     startAt: startAt(new Date()),
  //     limit: 10,
  //     page: page,
  //   });
  //   const paginatedPostsData = paginatedPosts.docs.map((doc: any) => ({
  //     ...doc.data(),
  //   }));
  //   setPosts([...paginatedPostsData, ...posts]);
  //   setPage(page + 1);
  //   setIsLoading(false);
  //   if (posts.length < 10) {
  //     setIsEnd(true);
  //   }
  // };
  // ref to scrollview
  // const scrollViewRef = useRef<ScrollView>(null);

  // useEffect(() => {
  //   // change pagination when user scroll to the bottom
  //   const onScroll = (event: any) => {
  //     if (
  //       event.nativeEvent.contentOffset.y >=
  //       event.nativeEvent.contentSize.height - screenHeight
  //     ) {
  //       getPosts();
  //     }
  //   };
  //   return () => {
  //     // @ts-ignore
  //     postsCollectionRef.off("value", onScroll);
  //   };
  // }, [posts]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require("@Assets/images/uni.jpg")}
        />
        {posts.map((post, index) => (
          <View key={index} style={{ flex: 1 }}>
            {/* <RenderHtml
              contentWidth={100}
              source={{
                html: rtlWebview(post.body),
              }}
              defaultTextProps={{
                style: {
                  fontSize: 16,
                  fontFamily: "Roboto",
                  lineHeight: 24,
                  color: "#000",
                  textAlign: "left",
                },
              }}
            /> */}
            {/* {isConnecte ? (
              <WebView
                style={{
                  flex: 1,
                  width: screenWidth,
                  minHeight: screenHeight,
                  paddingVertical: 4,
                }}
                minimumFontSize={72}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                originWhitelist={["*"]}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                onError={(error) => {
                  Alert.alert(
                    "خطأ",
                    "حدث خطأ أثناء تحميل الموقع",
                    [{ text: "حسنا" }],
                    { cancelable: false }
                  );
                }}
                source={{
                  html: rtlWebview(post.body),
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                }}
              >
                <Text>لا يوجد اتصال بالانترنت</Text>
              </View>
            )} */}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
