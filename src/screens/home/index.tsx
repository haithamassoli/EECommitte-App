import { useEffect, useState, useRef } from "react";
import { View, Image, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import RenderHtml from "react-native-render-html";
import { rtlWebview, screenHeight, screenWidth } from "../../utils/Helper";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  startAt,
} from "firebase/firestore";
import styles from "./styles";
import { Post } from "../../types";

const HomeScreen = () => {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    getPosts();
  }, []);

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const getPosts = async () => {
    if (isLoading || isEnd) return;
    setIsLoading(true);
    // @ts-ignore
    const paginatedPosts = await getDocs(postsCollectionRef, {
      orderBy: orderBy("createdAt", "desc"),
      startAt: startAt(new Date()),
      limit: 10,
      page: page,
    });
    const paginatedPostsData = paginatedPosts.docs.map((doc: any) => ({
      ...doc.data(),
    }));
    setPosts([...paginatedPostsData, ...posts]);
    setPage(page + 1);
    setIsLoading(false);
    if (posts.length < 10) {
      setIsEnd(true);
    }
  };
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
          resizeMode="contain"
          source={require("../../../assets/images/uni.jpg")}
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
              source={{
                html: rtlWebview(post.body),
              }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
