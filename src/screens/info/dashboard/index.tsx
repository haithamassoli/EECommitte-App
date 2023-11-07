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
import { useContext, useEffect, useState } from "react";
import CustomButton from "@Components/ui/customButton";
import { StackScreenProps } from "@react-navigation/stack";
import { InfoStackParamList } from "@Types/navigation";
import { useColorScheme } from "@Src/store/themeContext";
import { PasswordContext } from "@Src/store/passwordContext";

type Props = StackScreenProps<InfoStackParamList, "Dashboard">;

const DashboardScreen = ({ navigation }: Props) => {
  const { mutate, isLoading } = checkPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const { isTrue, setIsTrue } = useContext(PasswordContext);
  const { theme } = useColorScheme();
  const { control, handleSubmit, reset, setError } =
    useForm<VerificationPasswordSchemaType>({
      resolver: zodResolver(verificationPasswordSchema),
    });

  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  const onEyePress = () => {
    setShowPassword((e) => !e);
  };

  useEffect(() => {
    if (isTrue) {
      navigation.replace("DashboardList");
    }
  }, []);

  const onSubmit = (FormData: VerificationPasswordSchemaType) => {
    mutate(FormData.password, {
      onSuccess: (data) => {
        if (FormData.password === data?.password) {
          reset();
          setIsTrue(true);
          navigation.replace("DashboardList");
        } else {
          setError("password", {
            message: "كلمة المرور غير صحيحة",
          });
        }
      },
      onError: (error) => {
        setError("password", {
          message: "كلمة المرور غير صحيحة",
        });
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
