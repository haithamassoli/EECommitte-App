import { useEffect, useState } from "react";
import { View, Image, ScrollView, Text } from "react-native";
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
    const getPosts = async () => {
      // infinite scroll
      // const posts = await getDocs(postsCollectionRef, {
      //   orderBy: orderBy("createdAt", "desc"),
      //   startAt: startAt(new Date()),
      //   limit: 10,
      // });
      // setPosts(posts);

      const data = await getDocs(postsCollectionRef);
      setPosts(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  // infinite scroll then load more
  // const loadMore = async () => {
  //   const infinitePosts = await getDocs(postsCollectionRef, {
  //     orderBy: orderBy("createdAt", "desc"),
  //     startAt: startAt(new Date()),
  //     limit: 10,
  //     startAfter: posts[posts.length - 1].createdAt,
  //   });
  //   setPosts([...posts, ...infinitePosts]);
  // };

  // useEffect(() => {
  //   // loadMore();
  // }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require("../../../assets/images/uni.jpg")}
        />
        {posts.map((post) => (
          <View key={post.id} style={{ flex: 1 }}>
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
            {/* <WebView
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
            /> */}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
