import { View, Text, ScrollView, Image, Pressable, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
  RewardedInterstitialAd,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";

import { WebDisplay } from "@Components/webDisplay";
import Colors from "@GlobalStyle/Colors";
import { isConnected, screenHeight, screenWidth } from "@Utils/Helper";
import { db } from "@Src/firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  startAt,
  limit,
} from "firebase/firestore";
import { ThemeContext } from "@Src/store/themeContext";
import { Post } from "@Types/index";

const interstitial = InterstitialAd.createForAdRequest(
  "ca-app-pub-6462207765068097/3726618012"
);

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
  "ca-app-pub-6462207765068097/1088846385"
);

const NewsScreen = () => {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [isConnecte, setIsConnecte] = useState<boolean | null>(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const postsCollectionRef = collection(db, "posts");

  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  useEffect(() => {
    // getPosts();
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

  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const [rewardedInterstitialLoaded, setRewardedInterstitialLoaded] =
    useState(false);

  const loadInterstitial = () => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true);
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInterstitialLoaded(false);
        interstitial.load();
      }
    );

    interstitial.load();

    return () => {
      unsubscribeClosed();
      unsubscribeLoaded();
    };
  };

  const loadRewardedInterstitial = () => {
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setRewardedInterstitialLoaded(true);
      }
    );

    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log(`User earned reward of ${reward.amount} ${reward.type}`);
      }
    );

    const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setRewardedInterstitialLoaded(false);
        rewardedInterstitial.load();
      }
    );

    rewardedInterstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeEarned();
    };
  };

  useEffect(() => {
    const unsubscribeInterstitialEvents = loadInterstitial();
    const unsubscribeRewardedInterstitialEvents = loadRewardedInterstitial();

    return () => {
      unsubscribeInterstitialEvents();
      unsubscribeRewardedInterstitialEvents();
    };
  }, []);
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {interstitialLoaded ? (
          <Button
            title="Show Interstitial"
            onPress={() => interstitial.show()}
          />
        ) : (
          <Text>Loading Interstitial...</Text>
        )}
        {rewardedInterstitialLoaded ? (
          <Button
            title="Show Rewarded Interstitial"
            onPress={() => rewardedInterstitial.show()}
          />
        ) : (
          <Text>Loading Rewarded Interstitial...</Text>
        )}
        <BannerAd
          unitId="ca-app-pub-6462207765068097/5093624280"
          size={BannerAdSize.LARGE_BANNER}
        />
        <Image
          style={{ width: screenWidth, height: screenHeight }}
          resizeMode="cover"
          source={{
            uri: "https://images.unsplash.com/photo-1660548842564-ed763eaa0b5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
          }}
        />
        <BannerAd
          unitId="ca-app-pub-6462207765068097/5093624280"
          size={BannerAdSize.FULL_BANNER}
        />
        <Image
          style={{ width: screenWidth, height: screenHeight }}
          resizeMode="cover"
          source={{
            uri: "https://images.unsplash.com/photo-1660548842807-0495cc5423e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
          }}
        />
        <BannerAd
          unitId="ca-app-pub-6462207765068097/5093624280"
          size={BannerAdSize.FULL_BANNER}
        />
        <Image
          style={{ width: screenWidth, height: screenHeight }}
          resizeMode="cover"
          source={{
            uri: "https://images.unsplash.com/photo-1660665508252-29c504d48ce8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
          }}
        />
        <BannerAd
          unitId="ca-app-pub-6462207765068097/5093624280"
          size={BannerAdSize.FULL_BANNER}
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

export default NewsScreen;
