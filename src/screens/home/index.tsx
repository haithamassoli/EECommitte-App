import { useEffect, useState, useContext } from "react";
import { View, Image, ScrollView, Text, Pressable } from "react-native";
import { isConnected, rtlWebview, screenWidth } from "@Utils/Helper";
import { db } from "@Src/firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  startAt,
  limit,
} from "firebase/firestore";
import styles from "./styles";
import { Post } from "@Types/index";
import { AdMobBanner } from "expo-ads-admob";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { WebDisplay } from "@Components/webDisplay";
const HomeScreen = () => {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [isConnecte, setIsConnecte] = useState<boolean | null>(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const postsCollectionRef = collection(db, "posts");

  const { theme } = useContext(ThemeContext);
  const textColor =
    theme === "light" ? Colors.lightTextColor : Colors.darkTextColor;

  useEffect(() => {
    getPosts();
    isConnected().then((isConnected) => {
      setIsConnecte(isConnected);
    });
  }, [page]);

  const getPosts = async () => {
    // if (isLoading || isEnd) return;
    // setIsLoading(true);
    const paginatedPosts = query(
      postsCollectionRef,
      orderBy("post_id", "desc"),
      limit(10),
      startAt(page * 10 - 9)
    );
    const postss = await getDocs(paginatedPosts);
    postss.forEach((post) => {
      console.log(post.data());
      // @ts-ignore
      setPosts((prevPosts) => [...prevPosts, post.data()]);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <AdMobBanner
          bannerSize="smartBannerLandscape"
          adUnitID="ca-app-pub-6462207765068097/3044148231" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={(err) => console.log(err)}
        />
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: "https://images.unsplash.com/photo-1659425191734-773850835dad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
          }}
        />
        <AdMobBanner
          bannerSize="smartBannerLandscape"
          adUnitID="ca-app-pub-6462207765068097/3044148231" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={(err) => console.log(err)}
        />
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: "https://images.unsplash.com/photo-1659397426038-7a7ca56e5e15?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
          }}
        />
        <AdMobBanner
          bannerSize="smartBannerLandscape"
          adUnitID="ca-app-pub-6462207765068097/3044148231" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={(err) => console.log(err)}
        />
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: "https://images.unsplash.com/photo-1659457706578-06b0e8bbf087?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
          }}
        />
        <AdMobBanner
          bannerSize="smartBannerLandscape"
          adUnitID="ca-app-pub-6462207765068097/3044148231" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={(err) => console.log(err)}
        />
        {posts.map((post, index) => (
          <View key={index} style={{ flex: 1 }}>
            {isConnecte ? (
              <WebDisplay html={post.body} />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                }}
              >
                <Text style={{ color: textColor }}>
                  لا يوجد اتصال بالانترنت
                </Text>
              </View>
            )}
          </View>
        ))}
        <Pressable
          style={{
            backgroundColor: Colors.primary600,
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => setPage((prev) => prev + 1)}
        >
          <Text
            style={{
              color: textColor,
            }}
          >
            أظهر المزيد
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
