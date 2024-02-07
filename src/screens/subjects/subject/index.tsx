import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Linking,
  RefreshControl,
} from "react-native";
import type {
  StackScreenProps,
  StackNavigationProp,
} from "@react-navigation/stack";
import type { SubjectsStackParamList } from "@Types/navigation";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { Feather, AntDesign } from "@expo/vector-icons";
import { hs, ms, vs } from "@Utils/Platform";
import { blurhash, screenHeight, screenWidth } from "@Utils/Helper";
import { FavoriteContext } from "@Src/store/favoriteContext";
import HeaderRight from "../HeaderRight";
import { fetchSubjectById } from "@Src/api/fetchSubjectById";
import NoConnection from "@Components/NoConnection";
import { ImageBackground } from "expo-image";
import { Modal, Portal, TextInput } from "react-native-paper";
import {
  VerificationPasswordSchemaType,
  verificationPasswordSchema,
} from "@Types/schema";
import { checkPasswordMutation } from "@Src/api/dashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Animated, { FadeInUp } from "react-native-reanimated";
import CustomButton from "@Components/ui/customButton";
import ControlledInput from "@Components/controlledInput";
import Loading from "@Components/ui/loading";
import { PasswordContext } from "@Src/store/passwordContext";

type Props = StackScreenProps<SubjectsStackParamList, "Subject">;
export type SubjectNavigationProp = StackNavigationProp<
  SubjectsStackParamList,
  "Subject"
>;

const firstFrame = require("@Assets/images/subjectColors/first.png");
const secondFrame = require("@Assets/images/subjectColors/second.png");
const thirdFrame = require("@Assets/images/subjectColors/third.png");
const sharedFrame = require("@Assets/images/subjectColors/shared.png");
const telecomFrame = require("@Assets/images/subjectColors/telecom.png");
const powerFrame = require("@Assets/images/subjectColors/power.png");
const firstDarkFrame = require("@Assets/images/subjectColors/firstDark.png");
const secondDarkFrame = require("@Assets/images/subjectColors/secondDark.png");
const thirdDarkFrame = require("@Assets/images/subjectColors/thirdDark.png");
const sharedDarkFrame = require("@Assets/images/subjectColors/sharedDark.png");
const telecomDarkFrame = require("@Assets/images/subjectColors/telecomDark.png");
const powerDarkFrame = require("@Assets/images/subjectColors/powerDark.png");

const SubjectScreen = ({ navigation, route }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [refetchCounter, setRefetchCounter] = useState(0);
  const { theme } = useContext(ThemeContext);
  const { mutate, isLoading: isChecking } = checkPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, setError } =
    useForm<VerificationPasswordSchemaType>({
      resolver: zodResolver(verificationPasswordSchema),
    });
  const { isTrue, setIsTrue } = useContext(PasswordContext);
  const { favorite, toggleFavorite } = useContext(FavoriteContext);
  const { data, isLoading, isFetching }: any = fetchSubjectById(
    route.params.subjectId,
    refetchCounter
  );
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const backgroundColor =
    theme === "light" ? Colors.lightBackgroundSec : Colors.darkBackgroundSec;

  const subjectFrame =
    data?.color === "#F79606" && theme === "light"
      ? firstFrame
      : data?.color === "#F79606" && theme === "dark"
      ? firstDarkFrame
      : data?.color === "#F31313" && theme === "light"
      ? secondFrame
      : data?.color === "#F31313" && theme === "dark"
      ? secondDarkFrame
      : data?.color === "#0200CF" && theme === "light"
      ? thirdFrame
      : data?.color === "#0200CF" && theme === "dark"
      ? thirdDarkFrame
      : data?.color === "#29abef" && theme === "light"
      ? sharedFrame
      : data?.color === "#29abef" && theme === "dark"
      ? sharedDarkFrame
      : data?.color === "#AF02AB" && theme === "light"
      ? telecomFrame
      : data?.color === "#AF02AB" && theme === "dark"
      ? telecomDarkFrame
      : data?.color === "#272727" && theme === "light"
      ? powerFrame
      : powerDarkFrame;

  const backgroundSubjectColor = data?.color;

  const handleRefetch = () => {
    setRefetchCounter(0);
    setRefetchCounter((prev) => prev + 1);
  };

  const onEyePress = () => {
    setShowPassword((e) => !e);
  };

  const onSubmit = (FormData: VerificationPasswordSchemaType) => {
    mutate(FormData.password, {
      onSuccess: (data) => {
        if (FormData.password === data?.password) {
          setIsVisible(false);
          setIsTrue(true);
          navigation.push("EditSubject", {
            subjectId: data?.uid,
          });
        } else {
          setError("password", {
            message: "كلمة المرور غير صحيحة",
          });
        }
      },
      onError: () => {
        setError("password", {
          message: "كلمة المرور غير صحيحة",
        });
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data?.name2 || "المادة",
      headerTitleAlign: "center",
      headerLeft: () => (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingStart: hs(12),
            }}
          >
            <Feather name="arrow-right" size={ms(24)} color={textColor} />
            <Feather name="book" size={ms(24)} color={textColor} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (isTrue) {
                navigation.push("EditSubject", {
                  subjectId: data?.uid,
                });
              } else {
                setIsVisible(true);
              }
            }}
            style={{
              paddingStart: hs(8),
            }}
          >
            <Feather name="edit" size={ms(24)} color={textColor} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => {
        return (
          <HeaderRight
            onPress={() => {
              navigation.navigate("Search");
            }}
          />
        );
      },
    });
  }, [data?.name, theme]);

  useEffect(() => {
    const isFavorite = favorite.some((item) => item.id === data?.id);
    setIsFavorite(isFavorite);
  }, [favorite]);

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
        size="large"
        color={theme === "light" ? Colors.primary700 : Colors.primary400}
      />
    );
  }
  if (Array.isArray(data) && data.length === 0) {
    return <NoConnection refetch={handleRefetch} />;
  }
  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={() => {
            if (refetchCounter === 0) {
              setRefetchCounter(1);
            }
          }}
          colors={theme === "light" ? [Colors.primary700] : [Colors.primary400]}
          progressBackgroundColor={
            theme === "light"
              ? Colors.lightBackgroundSec
              : Colors.darkBackgroundSec
          }
          tintColor={theme === "light" ? Colors.primary700 : Colors.primary400}
        />
      }
    >
      <Portal>
        <Modal visible={isVisible} onDismiss={() => setIsVisible(false)}>
          <View
            style={{
              backgroundColor: backgroundColor,
              width: screenWidth - hs(32),
              borderRadius: ms(16),
              alignSelf: "center",
              paddingVertical: vs(32),
              paddingHorizontal: hs(16),
            }}
          >
            {isChecking ? (
              <Loading size="small" />
            ) : (
              <>
                <Animated.View
                  entering={FadeInUp.withInitialValues({
                    transform: [{ translateY: vs(-25) }],
                  }).duration(600)}
                >
                  <Text
                    style={{
                      color: textColor,
                      fontSize: ms(20),
                      fontFamily: "TajawalBold",
                      textAlign: "center",
                      marginBottom: vs(12),
                    }}
                  >
                    أدخل كلمة المرور
                  </Text>
                </Animated.View>
                <Animated.View
                  entering={FadeInUp.withInitialValues({
                    transform: [{ translateY: vs(-25) }],
                  })
                    .duration(600)
                    .delay(200)}
                >
                  <ControlledInput
                    control={control}
                    name="password"
                    mode="outlined"
                    textContentType="password"
                    placeholder="ادخل كلمة المرور"
                    autoCapitalize="none"
                    outlineStyle={{
                      borderRadius: ms(18),
                    }}
                    style={{
                      width: "100%",
                    }}
                    secureTextEntry={!showPassword}
                    right={
                      <TextInput.Icon
                        icon={showPassword ? "eye-off" : "eye"}
                        onPress={onEyePress}
                      />
                    }
                  />
                </Animated.View>
                <Animated.View
                  entering={FadeInUp.withInitialValues({
                    transform: [{ translateY: vs(-25) }],
                  })
                    .duration(600)
                    .delay(400)}
                >
                  <CustomButton
                    mode="contained"
                    onPress={handleSubmit(onSubmit)}
                    title="تسجيل الدخول"
                    style={{
                      width: "100%",
                    }}
                  />
                </Animated.View>
              </>
            )}
          </View>
        </Modal>
      </Portal>
      <Animated.View entering={FadeInUp.duration(600)}>
        <ImageBackground
          contentFit="contain"
          source={subjectFrame}
          placeholder={blurhash}
          placeholderContentFit="cover"
          transition={400}
          style={{
            height: screenHeight < 650 ? vs(268) : vs(200),
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: ms(24),
              color: Colors.darkText,
              fontFamily: "Bukra",
            }}
          >
            {data?.name2}
          </Text>
        </ImageBackground>
      </Animated.View>
      <View
        style={{
          flex: 1,
          padding: ms(10),
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Animated.View entering={FadeInUp.duration(600).delay(200)}>
          <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigation.navigate("SubjectFullPost", {
                post: data?.aboutSubject,
                postTitle: "عن المادة",
              })
            }
            style={[style.button, { backgroundColor }]}
          >
            <Text style={[style.buttonText, { color: textColor }]}>
              التعريف بالمادة
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(600).delay(400)}>
          <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigation.navigate("SubjectFullPost", {
                post: data?.fullPost,
                postTitle: "البوست الشامل",
              })
            }
            style={[style.button, { backgroundColor }]}
          >
            <Text style={[style.buttonText, { color: textColor }]}>
              البوست الشامل
            </Text>
          </TouchableOpacity>
        </Animated.View>
        {data?.book && (
          <Animated.View entering={FadeInUp.duration(600).delay(600)}>
            <TouchableOpacity
              onPress={() => data.book && Linking.openURL(data.book)}
              style={[
                style.button,
                { backgroundColor: backgroundSubjectColor },
              ]}
            >
              <Text style={style.buttonText}>الكتاب</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        {data?.manual && (
          <Animated.View entering={FadeInUp.duration(600).delay(600)}>
            <TouchableOpacity
              onPress={() => data.manual && Linking.openURL(data.manual)}
              style={[
                style.button,
                { backgroundColor: backgroundSubjectColor },
              ]}
            >
              <Text style={style.buttonText}>المانيول</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        {data?.prevYears && (
          <Animated.View entering={FadeInUp.duration(600).delay(600)}>
            <TouchableOpacity
              onPress={() => data.prevYears && Linking.openURL(data.prevYears)}
              style={[
                style.button,
                { backgroundColor: backgroundSubjectColor },
              ]}
            >
              <Text style={style.buttonText}>السنوات السابقة</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        {data?.exams && (
          <Animated.View entering={FadeInUp.duration(600).delay(600)}>
            <TouchableOpacity
              onPress={() => data.exams && Linking.openURL(data.exams)}
              style={[
                style.button,
                { backgroundColor: backgroundSubjectColor },
              ]}
            >
              <Text style={style.buttonText}>الامتحانات</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        {data?.slides && (
          <Animated.View entering={FadeInUp.duration(600).delay(600)}>
            <TouchableOpacity
              onPress={() => data.slides && Linking.openURL(data.slides)}
              style={[
                style.button,
                { backgroundColor: backgroundSubjectColor },
              ]}
            >
              <Text style={style.buttonText}>السلايدات</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        {data?.explanations?.map((explanation: any, index: number) => (
          <Animated.View
            key={index}
            entering={FadeInUp.duration(600).delay(800 + 200 * index)}
          >
            <TouchableOpacity
              onPress={() =>
                explanation.link && Linking.openURL(explanation.link)
              }
              style={[
                style.button,
                { backgroundColor: backgroundSubjectColor },
              ]}
            >
              <Text style={style.buttonText}>{explanation.name}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
        <Animated.View entering={FadeInUp.duration(600).delay(1000)}>
          <TouchableOpacity
            onPress={() =>
              data?.subjectLink && Linking.openURL(data?.subjectLink)
            }
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={style.buttonText}>درايف المادة</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <Animated.View entering={FadeInUp.duration(600).delay(1200)}>
        <TouchableOpacity
          onPress={() => {
            toggleFavorite({
              id: data?.id,
              name: data?.name2,
            });
          }}
          style={[
            style.button,
            {
              width: screenWidth - hs(32),
              backgroundColor,
              alignSelf: "center",
              marginVertical: vs(10),
            },
          ]}
        >
          <Text style={[style.buttonText, { color: textColor }]}>
            {isFavorite ? "إزالة من المفضلة" : "إضافة الى المفضلة"}
          </Text>
          <AntDesign
            name={isFavorite ? "heart" : "hearto"}
            size={ms(24)}
            color={textColor}
            style={{ marginHorizontal: hs(10) }}
          />
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

export default SubjectScreen;

const style = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray,
    borderRadius: ms(10),
    paddingHorizontal: hs(10),
    paddingVertical: vs(10),
    marginHorizontal: hs(10),
    marginVertical: vs(10),
    width: screenWidth / 2 - hs(32),
  },
  buttonText: {
    fontSize: ms(18),
    textAlign: "center",
    fontFamily: "TajawalMedium",
    color: Colors.darkText,
  },
});
