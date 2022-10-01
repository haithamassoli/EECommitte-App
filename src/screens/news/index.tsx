// import React, { useContext, useEffect, useState } from "react";
// import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
// import { WebDisplay } from "@Components/webDisplay";
// import Colors from "@GlobalStyle/Colors";
// import { isConnected, screenHeight, screenWidth } from "@Utils/Helper";
// import { db } from "@Src/firebase-config";
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   startAt,
//   limit,
// } from "firebase/firestore";
// import { ThemeContext } from "@Src/store/themeContext";
// import { Post } from "@Types/index";
// import { moderateScale } from "@Utils/Platform";

// const NewsScreen = () => {
//   const [posts, setPosts] = useState<Post[] | []>([]);
//   const [isConnecte, setIsConnecte] = useState<boolean | null>(false);
//   const [page, setPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isEnd, setIsEnd] = useState(false);
//   const [search, setSearch] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const postsCollectionRef = collection(db, "posts");

//   const { theme } = useContext(ThemeContext);
//   const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

//   useEffect(() => {
//     // getPosts();
//     isConnected().then((isConnected) => {
//       setIsConnecte(isConnected);
//     });
//   }, [page]);

//   const getPosts = async () => {
//     // if (isLoading || isEnd) return;
//     // setIsLoading(true);
//     const paginatedPosts = query(
//       postsCollectionRef,
//       orderBy("post_id", "desc"),
//       limit(10),
//       startAt(page * 10 - 9)
//     );
//     const postss = await getDocs(paginatedPosts);
//     postss.forEach((post) => {
//       // console.log(post.data());
//       // @ts-ignore
//       setPosts((prevPosts) => [...prevPosts, post.data()]);
//     });
//   };

//   return (
//     <ScrollView
//       overScrollMode="never"
//       showsVerticalScrollIndicator={false}
//       style={{ flex: 1 }}
//     >
//       <View style={{ flex: 1 }}>
//         <Image
//           style={{ width: screenWidth, height: screenHeight }}
//           resizeMode="cover"
//           source={{
//             uri: "https://images.unsplash.com/photo-1660548842564-ed763eaa0b5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
//           }}
//         />
//         <Image
//           style={{ width: screenWidth, height: screenHeight }}
//           resizeMode="cover"
//           source={{
//             uri: "https://images.unsplash.com/photo-1660548842807-0495cc5423e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
//           }}
//         />
//         <Image
//           style={{ width: screenWidth, height: screenHeight }}
//           resizeMode="cover"
//           source={{
//             uri: "https://images.unsplash.com/photo-1660665508252-29c504d48ce8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
//           }}
//         />
//         {posts.map((post, index) => (
//           <View key={index} style={{ flex: 1 }}>
//             {isConnecte ? (
//               <WebDisplay html={post.body} />
//             ) : (
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: "center",
//                   alignItems: "center",
//                   backgroundColor: "white",
//                 }}
//               >
//                 <Text style={{ color: textColor }}>
//                   لا يوجد اتصال بالانترنت
//                 </Text>
//               </View>
//             )}
//           </View>
//         ))}
//         <TouchableOpacity
//           style={{
//             backgroundColor: Colors.primary600,
//             padding: moderateScale(10),
//             borderRadius: moderateScale(10),
//           }}
//           onPress={() => setPage((prev) => prev + 1)}
//         >
//           <Text
//             style={{
//               color: textColor,
//             }}
//           >
//             أظهر المزيد
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default NewsScreen;
