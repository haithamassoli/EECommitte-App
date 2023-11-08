import NoConnection from "@Components/NoConnection";
import ControlledInput from "@Components/controlledInput";
import CustomButton from "@Components/ui/customButton";
import Loading from "@Components/ui/loading";
import Colors from "@GlobalStyle/Colors";
import {
  addFAQMutation,
  deleteFAQMutation,
  fetchFAQQuery,
  updateFAQMutation,
} from "@Src/api/fetchFAQ";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import { screenWidth } from "@Utils/Helper";
import { hs, ms, vs } from "@Utils/Platform";
import { Feather } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import { FlashList } from "@shopify/flash-list";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HelperText } from "react-native-paper";
import { RichEditor } from "react-native-pell-rich-editor";

const ManageFAQScreen = () => {
  const { isConnected } = useNetInfo();
  const { theme } = useContext(ThemeContext);
  const richText = useRef<any>();

  const { data, isLoading, refetch } = fetchFAQQuery();
  const { mutate: addFAQ, isLoading: isAdding } = addFAQMutation();
  const { mutate, isLoading: isUpdating } = updateFAQMutation();
  const { mutate: deleteFAQ, isLoading: isDeleting } = deleteFAQMutation();

  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const backgroundColor =
    theme === "light" ? Colors.lightBackgroundSec : Colors.darkBackgroundSec;

  const { control, handleSubmit } = useForm({
    // resolver: zodResolver(),
  });

  const renderItem = ({ item, index }: any) => (
    <>
      {index === 0 && (
        <>
          {(isUpdating || isAdding || isDeleting) && <Loading size="small" />}
          <ControlledInput
            name="title"
            control={control}
            label={"عنوان السؤال"}
            placeholder={"ادخل العنوان"}
          />
          <Text
            style={{
              textAlign: "left",
              fontFamily: "TajawalBold",
              fontSize: ms(16),
              color: textColor,
            }}
          >
            جواب السؤال
          </Text>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
            <Controller
              control={control}
              name="content"
              render={({
                field: { onChange, onBlur },
                fieldState: { error, invalid },
              }) => (
                <>
                  <RichEditor
                    ref={richText}
                    onBlur={onBlur}
                    initialHeight={vs(132)}
                    onChange={onChange}
                    styleWithCSS={true}
                    editorStyle={{
                      backgroundColor: Colors.lightBackgroundSec,
                      color: Colors.lightText,
                      placeholderColor: Colors.lightText,
                      caretColor: Colors.primary500,
                      cssText: "text-align: right;",
                      contentCSSText:
                        "font-size: 16px; min-height: 200px; height: 100%; text-align: right;",
                    }}
                    style={styles.rich}
                  />
                  <HelperText
                    type="error"
                    visible={invalid}
                    style={{
                      fontFamily: "TajawalMedium",
                      textAlign: "left",
                      width: screenWidth || "86%",
                    }}
                  >
                    {error?.message}
                  </HelperText>
                </>
              )}
            />
          </KeyboardAwareScrollView>
          <CustomButton
            mode="contained"
            title="إضافة"
            onPress={handleSubmit(onAdding)}
            style={{
              width: "86%",
              alignSelf: "center",
              marginBottom: vs(12),
            }}
          />
        </>
      )}
      <View style={[styles.container, { backgroundColor }]}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}
        >
          <Feather name="x" size={ms(24)} color={Colors.secondYear} />
        </TouchableOpacity>
        <View style={{ backgroundColor }}>
          <ControlledInput
            control={control}
            withError={false}
            defaultValue={item.title}
            name={`title.${index}`}
            mode="outlined"
            placeholder="ادخل العنوان"
            label={"عنوان السؤال"}
            outlineStyle={{
              borderRadius: ms(18),
            }}
            style={{
              marginBottom: vs(12),
            }}
          />
          <ControlledInput
            control={control}
            withError={false}
            defaultValue={item.id}
            name={`id.${index}`}
            style={{
              display: "none",
            }}
          />
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
            <Controller
              control={control}
              name={`content.${index}`}
              defaultValue={item.content}
              render={({
                field: { onChange, onBlur },
                fieldState: { error, invalid },
              }) => (
                <>
                  <RichEditor
                    ref={richText}
                    onBlur={onBlur}
                    initialContentHTML={item.content}
                    initialHeight={vs(132)}
                    onChange={onChange}
                    styleWithCSS={true}
                    editorStyle={{
                      backgroundColor: Colors.lightBackgroundSec,
                      color: Colors.lightText,
                      placeholderColor: Colors.lightText,
                      caretColor: Colors.primary500,
                      cssText: "text-align: right;",
                      contentCSSText:
                        "font-size: 16px; min-height: 200px; height: 100%; text-align: right;",
                    }}
                    style={styles.rich}
                  />
                  <HelperText
                    type="error"
                    visible={invalid}
                    style={{
                      fontFamily: "TajawalMedium",
                      textAlign: "left",
                      width: screenWidth || "86%",
                    }}
                  >
                    {error?.message}
                  </HelperText>
                </>
              )}
            />
          </KeyboardAwareScrollView>
        </View>
        <CustomButton
          title="تعديل"
          onPress={handleSubmit((item) => onUpdating(item, index))}
        />
      </View>
    </>
  );

  const onUpdating = (FormData: any, index: number) => {
    mutate(
      {
        title: FormData.title[index],
        content: FormData.content[index],
        time: new Date(),
        id: FormData.id[index],
      },
      {
        onSuccess: () => {
          Alert.alert("تم التحديث بنجاح", "", [
            {
              text: "تم",
            },
          ]);
          refetch();
        },
      }
    );
  };

  const onAdding = (FormData: any) => {
    addFAQ(
      {
        title: FormData.title,
        content: FormData.content,
        time: new Date(),
      },
      {
        onSuccess: () => {
          Alert.alert("تم إضافة السؤال بنجاح", "", [
            {
              text: "تم",
            },
          ]);
          refetch();
        },
      }
    );
  };

  const onDelete = (id: string) => {
    deleteFAQ(id, {
      onSuccess: () => {
        Alert.alert("تم الحذف بنجاح", "", [
          {
            text: "تم",
          },
        ]);
        refetch();
      },
    });
  };

  if (isLoading) return <Loading />;
  if (isConnected === false) return <NoConnection />;

  return (
    <View style={{ flex: 1, marginHorizontal: hs(12) }}>
      <FlashList
        data={data}
        contentContainerStyle={{ paddingVertical: vs(12) }}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item) => item.id}
        estimatedItemSize={100}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ManageFAQScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: hs(16),
    paddingTop: vs(24),
    paddingBottom: vs(16),
    marginBottom: vs(12),
  },
  rich: {
    borderRadius: ms(12),
    overflow: "hidden",
    borderColor: Colors.primary400,
    borderWidth: 1,
  },
  deleteButton: {
    position: "absolute",
    right: hs(8),
    top: vs(6),
    zIndex: 10,
  },
});
