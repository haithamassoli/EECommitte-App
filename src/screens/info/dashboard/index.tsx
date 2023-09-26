import { useForm } from "react-hook-form";
import { View, Text } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VerificationPasswordSchemaType,
  verificationPasswordSchema,
} from "@Types/schema";
import { TextInput } from "react-native-paper";
import ControlledInput from "@Components/controlledInput";
import Animated, { FadeInUp } from "react-native-reanimated";
import { hs, ms, vs } from "@Utils/Platform";
import Colors from "@GlobalStyle/Colors";
import { checkPasswordMutation } from "@Src/api/dashboard";
import Loading from "@Components/ui/loading";
import { useState } from "react";
import CustomButton from "@Components/ui/customButton";

const DashboardScreen = () => {
  const { mutate, isLoading } = checkPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, reset } =
    useForm<VerificationPasswordSchemaType>({
      resolver: zodResolver(verificationPasswordSchema),
    });

  const onEyePress = () => {
    setShowPassword((e) => !e);
  };

  const onSubmit = (FormData: VerificationPasswordSchemaType) => {
    mutate(FormData.password, {
      onSuccess: (data) => {
        if (FormData.password === data?.password) {
          console.log("Password is correct");
          reset();
        } else {
          console.log("Password is incorrect");
          reset();
        }
      },
      onError: (error) => {
        console.log("Password is incorrect");
        reset();
      },
    });
  };

  if (isLoading) return <Loading />;

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
            color: Colors.lightText,
            fontSize: ms(20),
            fontFamily: "TajawalBold",
            textAlign: "center",
          }}
        >
          أدخل كلمو المرور
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
          inputMode="numeric"
          outlineStyle={{
            borderRadius: ms(18),
          }}
          style={{
            width: hs(300),
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
          .delay(400)}
      >
        <CustomButton
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          title="تسجيل الدخول"
          style={{
            width: hs(300),
          }}
        />
      </Animated.View>
    </View>
  );
};

export default DashboardScreen;
