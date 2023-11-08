import ControlledInput from "@Components/controlledInput";
import CustomButton from "@Components/ui/customButton";
import Loading from "@Components/ui/loading";
import Colors from "@GlobalStyle/Colors";
import { fetchNotificationsTokensQuery } from "@Src/api/fetchNotifications";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import {
  ValidationNotificationsSchemaType,
  validationNotificationsSchema,
} from "@Types/schema";
import { hs, ms, vs } from "@Utils/Platform";
import { sendNotification } from "@Utils/sendNotification";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View, Text, Alert } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const ManageNotificationsScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { data, isLoading } = fetchNotificationsTokensQuery();
  const [isSending, setIsSending] = useState(false);

  const { control, handleSubmit, reset } =
    useForm<ValidationNotificationsSchemaType>({
      resolver: zodResolver(validationNotificationsSchema),
    });

  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  const handleSendNotification = async (
    formData: ValidationNotificationsSchemaType
  ) => {
    setIsSending(true);
    const chunkSize = 90;
    const tokenChunks = [];
    for (let i = 0; i < data?.length!; i += chunkSize) {
      const chunk = data?.slice(i, i + chunkSize);
      tokenChunks.push(chunk);
    }

    for (const chunk of tokenChunks) {
      await wait(400);
      await sendNotification(
        chunk!,
        formData.title,
        formData.body,
        formData.link
      );
    }
    setIsSending(false);
    reset();
    Alert.alert("تم ارسال الإشعارات بنجاح", "", [
      {
        text: "تم",
      },
    ]);
  };

  if (isLoading || isSending) return <Loading />;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
            lineHeight: vs(26),
          }}
        >
          الإشعارات
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
          name="title"
          mode="outlined"
          placeholder="العنوان"
          outlineStyle={{
            borderRadius: ms(18),
          }}
          style={{
            width: hs(300),
          }}
        />
      </Animated.View>
      <Animated.View
        entering={FadeInUp.withInitialValues({
          transform: [{ translateY: vs(-25) }],
        })
          .duration(600)
          .delay(400)}
      >
        <ControlledInput
          control={control}
          name="body"
          mode="outlined"
          placeholder="الوصف"
          outlineStyle={{
            borderRadius: ms(18),
          }}
          style={{
            width: hs(300),
          }}
        />
      </Animated.View>
      <Animated.View
        entering={FadeInUp.withInitialValues({
          transform: [{ translateY: vs(-25) }],
        })
          .duration(600)
          .delay(600)}
      >
        <ControlledInput
          control={control}
          name="link"
          mode="outlined"
          placeholder="الرابط"
          outlineStyle={{
            borderRadius: ms(18),
          }}
          style={{
            width: hs(300),
          }}
        />
      </Animated.View>
      <View
        style={{
          height: vs(32),
        }}
      />
      <Animated.View
        entering={FadeInUp.withInitialValues({
          transform: [{ translateY: vs(-25) }],
        })
          .duration(600)
          .delay(800)}
      >
        <CustomButton
          mode="contained"
          onPress={handleSubmit(handleSendNotification)}
          title="إرسال"
          style={{
            width: hs(300),
            height: vs(48),
            borderRadius: ms(18),
          }}
        />
      </Animated.View>
    </View>
  );
};

export default ManageNotificationsScreen;
