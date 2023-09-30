import ControlledInput from "@Components/controlledInput";
import CustomButton from "@Components/ui/customButton";
import Loading from "@Components/ui/loading";
import Colors from "@GlobalStyle/Colors";
import {
  addSliderMutation,
  deleteSliderMutation,
  fetchSliderImagesQuery,
} from "@Src/api/fetchSliderImages";
import { useImagePicker } from "@Src/hooks/useImagePicker";
import { useColorScheme } from "@Src/store/themeContext";
import {
  VerificationSliderSchemaType,
  verificationSliderSchema,
} from "@Types/schema";
import { blurhash, screenWidth } from "@Utils/Helper";
import { hs, ms, vs } from "@Utils/Platform";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

const ManageCarouselScreen = () => {
  const { data, isLoading, refetch } = fetchSliderImagesQuery();
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useColorScheme();
  const { mutate: addSlider, isLoading: isAdding } = addSliderMutation();
  const { mutate: deleteSlider, isLoading: isDeleting } =
    deleteSliderMutation();

  const [mainImage, pickMainImage, isLoadingMainImage] = useImagePicker();

  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const backgroundColor =
    theme === "light" ? Colors.lightBackgroundSec : Colors.darkBackgroundSec;

  const { control, handleSubmit, reset } =
    useForm<VerificationSliderSchemaType>({
      resolver: zodResolver(verificationSliderSchema),
    });

  const onDelete = (id: string) => {
    deleteSlider(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const onSubmit = (FormData: VerificationSliderSchemaType) => {
    addSlider(
      {
        url: FormData.link || "",
        image: mainImage[0],
        time: new Date(),
      },
      {
        onSuccess: () => {
          setIsVisible(false);
          mainImage.length = 0;
          reset();
          refetch();
        },
      }
    );
  };

  if (isLoading || isAdding || isDeleting) return <Loading />;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={() => setIsVisible(false)}
          contentContainerStyle={[
            styles.modal,
            {
              backgroundColor:
                theme === "light"
                  ? Colors.lightBackground
                  : Colors.darkBackground,
            },
          ]}
        >
          <ControlledInput
            name="link"
            mode="outlined"
            control={control}
            autoCapitalize="none"
            withError={false}
            outlineStyle={{
              borderRadius: ms(18),
            }}
            label={`الرابط الذي يفتح عند الضغط على الصورة`}
            placeholder={"ادخل الرابط"}
          />
          {isLoadingMainImage && <Loading size="small" />}
          {mainImage.length > 0 && (
            <Image
              transition={400}
              contentFit="contain"
              placeholder={blurhash}
              placeholderContentFit="cover"
              source={mainImage[0]}
              style={{
                width: "100%",
                aspectRatio: 16 / 9,
                borderRadius: ms(16),
                marginBottom: vs(12),
              }}
            />
          )}
          {mainImage.length === 0 && (
            <CustomButton
              mode="text"
              title="اضافة صورة"
              style={{
                width: "100%",
              }}
              onPress={pickMainImage}
            />
          )}
          <CustomButton
            mode="contained"
            title="اضافة"
            style={{
              width: "100%",
            }}
            onPress={handleSubmit(onSubmit)}
          />
        </Modal>
      </Portal>
      {data?.map((item, index) => (
        <View
          key={item.id}
          style={{
            marginBottom: vs(12),
            paddingHorizontal: hs(16),
            paddingVertical: vs(16),
            backgroundColor: backgroundColor,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: vs(8),
            }}
          >
            <Text
              style={{
                fontFamily: "TajawalBold",
                fontSize: ms(16),
                textAlign: "left",
                color: textColor,
              }}
            >
              الصورة رقم {index + 1}
            </Text>
            <TouchableOpacity onPress={() => onDelete(item.id)}>
              <Feather name="x" size={ms(24)} color={textColor} />
            </TouchableOpacity>
          </View>
          <ControlledInput
            name={`image.${index}.url`}
            control={control}
            defaultValue={item.url || "لا يوجد رابط"}
            label={`الرابط الذي يفتح عند الضغط على الصورة رقم ${index + 1}`}
            placeholder={"ادخل الرابط"}
            withError={false}
          />
          <View style={{ height: vs(6) }} />
          <Image
            source={item.image}
            contentFit="contain"
            transition={400}
            style={{
              width: "100%",
              aspectRatio: 16 / 9,
              borderRadius: ms(12),
            }}
          />
        </View>
      ))}
      <CustomButton
        mode="contained"
        title="اضافة صورة"
        onPress={() => setIsVisible(true)}
        style={{
          width: "86%",
          alignSelf: "center",
          marginBottom: vs(12),
        }}
      />
    </ScrollView>
  );
};

export default ManageCarouselScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: hs(16),
    paddingVertical: vs(16),
  },
  modal: {
    width: screenWidth - hs(32),
    paddingHorizontal: hs(16),
    paddingVertical: vs(16),
    borderRadius: ms(16),
    alignSelf: "center",
  },
});
