import NoConnection from "@Components/NoConnection";
import ControlledInput from "@Components/controlledInput";
import { InsertLinkModal } from "@Components/insertLink";
import CustomButton from "@Components/ui/customButton";
import Loading from "@Components/ui/loading";
import Colors from "@GlobalStyle/Colors";
import {
  fetchSubjectByIdQuery,
  updateSubjectMutation,
} from "@Src/api/fetchSubjectById";
import { useImagePicker } from "@Src/hooks/useImagePicker";
import { ThemeContext } from "@Src/store/themeContext";
import { SubjectsStackParamList } from "@Types/navigation";
import {
  ValidationSubjectSchemaType,
  validationSubjectSchema,
} from "@Types/schema";
import { screenWidth } from "@Utils/Helper";
import { hs, ms, vs } from "@Utils/Platform";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNetInfo } from "@react-native-community/netinfo";
import { StackScreenProps } from "@react-navigation/stack";
import { useCallback, useContext, useEffect, useRef } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HelperText } from "react-native-paper";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";

interface RefLinkModal {
  setModalVisible: (visible: boolean) => void;
}

const handleHead = ({ tintColor }: any) => (
  <Text style={{ color: tintColor }}>H1</Text>
);
const handleHead2 = ({ tintColor }: any) => (
  <Text style={{ color: tintColor }}>H2</Text>
);
const handleHead3 = ({ tintColor }: any) => (
  <Text style={{ color: tintColor }}>H3</Text>
);

type Props = StackScreenProps<SubjectsStackParamList, "EditSubject">;

const EditSubjectScreen = ({ navigation, route }: Props) => {
  const { isConnected } = useNetInfo();
  const { theme } = useContext(ThemeContext);
  const richText = useRef<any>();
  const richText2 = useRef<any>();
  const linkModal = useRef<RefLinkModal>();
  const scrollRef = useRef<ScrollView>(null);
  const { mutate, isLoading } = updateSubjectMutation();
  const { data, isLoading: isFetching } = fetchSubjectByIdQuery(
    route?.params?.subjectId
  );
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const backgroundColor =
    theme === "light" ? Colors.lightBackgroundSec : Colors.darkBackgroundSec;

  const [editorImageList, editorPickImage, isLoadingImageEditor] =
    useImagePicker();

  const { control, handleSubmit } = useForm<ValidationSubjectSchemaType>({
    resolver: zodResolver(validationSubjectSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "explanations",
    rules: {
      minLength: 3,
      required: true,
    },
  });

  const onInsertLink = () => {
    console.log("onInsertLink");
    linkModal.current?.setModalVisible(true);
  };

  const onLinkDone = useCallback(
    ({ title, url }: { title?: string; url?: string }) => {
      if (title && url) {
        richText.current?.insertLink(title, url);
      }
    },
    []
  );

  const handleCursorPosition = useCallback((scrollY: number) => {
    scrollRef.current!.scrollTo({
      y: scrollY + vs(400),
      animated: true,
    });
  }, []);

  const onSubmit = (FormData: ValidationSubjectSchemaType) => {
    const dataWithSubjectId = {
      ...FormData,
      subjectId: route.params?.subjectId,
    };
    mutate(dataWithSubjectId, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `تعديل مادة ${data?.name2 || ""}`,
    });
  }, [data?.name2]);

  useEffect(() => {
    if (data?.explanations?.length! > 0 && fields.length === 0) {
      data?.explanations?.map((e) => {
        append(e);
      });
    }
  }, [data?.explanations]);

  useEffect(() => {
    if (editorImageList[0]) {
      richText.current?.insertImage(editorImageList[0]);
    }
  }, [editorImageList]);

  if (isLoading || isFetching) return <Loading />;
  if (isConnected === false) return <NoConnection />;

  return (
    <ScrollView
      ref={scrollRef}
      nestedScrollEnabled={true}
      scrollEventThrottle={20}
      contentContainerStyle={styles.container}
    >
      <ControlledInput
        name="name2"
        control={control}
        defaultValue={data?.name2 || ""}
        label={"الإسم الشائع"}
        placeholder={"ادخل الإسم الشائع"}
      />
      <ControlledInput
        name="name"
        control={control}
        defaultValue={data?.name || ""}
        label={"الإسم الثانوي"}
        placeholder={"ادخل الإسم الثانوي"}
      />
      <ControlledInput
        name="book"
        control={control}
        defaultValue={data?.book || ""}
        label={"الكتاب"}
        placeholder={"ادخل رابط الكتاب"}
      />
      <ControlledInput
        name="prevYears"
        control={control}
        defaultValue={data?.prevYears || ""}
        label={"السنوات السابقة"}
        placeholder={"ادخل رابط السنوات السابقة"}
      />
      <ControlledInput
        name="subjectLink"
        control={control}
        defaultValue={data?.subjectLink || ""}
        label={"درايف"}
        placeholder={"ادخل رابط درايف"}
      />
      <Text
        style={{
          textAlign: "left",
          fontFamily: "TajawalBold",
          fontSize: ms(16),
          color: textColor,
        }}
      >
        الشروحات
      </Text>
      {fields.map((item, index) => (
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
              الشرح رقم {index + 1}
            </Text>
            <TouchableOpacity onPress={() => remove(index)}>
              <Feather name="x" size={ms(24)} color={textColor} />
            </TouchableOpacity>
          </View>
          <ControlledInput
            name={`explanations.${index}.name`}
            control={control}
            defaultValue={item.name}
            label={`عنوان الشرح ${index + 1}`}
            placeholder={"ادخل عنوان الشرح"}
            withError={false}
          />
          <View style={{ height: vs(6) }} />
          <ControlledInput
            name={`explanations.${index}.link`}
            control={control}
            defaultValue={item.link}
            label={`رابط الشرح ${index + 1}`}
            placeholder={"ادخل رابط الشرح"}
            withError={false}
          />
        </View>
      ))}
      <CustomButton
        title={`${
          fields.length === 0 ? "لا يوجد شرح، إضافة شرح؟" : "اضافة شرح جديد"
        }`}
        mode="text"
        style={{
          marginBottom: vs(8),
        }}
        onPress={() =>
          append({
            link: "",
            name: "",
          })
        }
      />
      <Text
        style={{
          textAlign: "left",
          fontFamily: "TajawalBold",
          fontSize: ms(16),
          color: textColor,
        }}
      >
        البوست الشامل
      </Text>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <InsertLinkModal
          placeholderColor={textColor}
          color={textColor}
          backgroundColor={backgroundColor}
          onDone={onLinkDone}
          forwardRef={linkModal}
        />
        <Controller
          control={control}
          defaultValue={data?.fullPost || ""}
          name="fullPost"
          render={({
            field: { onChange, onBlur },
            fieldState: { error, invalid },
          }) => (
            <>
              {isLoadingImageEditor && (
                <View
                  style={{
                    flex: 1,
                    marginVertical: vs(12),
                  }}
                >
                  <Loading size="small" />
                </View>
              )}
              <RichEditor
                ref={richText}
                onBlur={onBlur}
                initialHeight={vs(180)}
                onCursorPosition={handleCursorPosition}
                initialContentHTML={data?.fullPost || ""}
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
        <View
          style={{
            paddingBottom: vs(32),
          }}
        >
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setUnderline,
              actions.insertLink,
              actions.heading1,
              actions.heading2,
              actions.heading3,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.undo,
              actions.redo,
              actions.insertImage,
            ]}
            selectedIconTint={Colors.primary400}
            disabledIconTint={Colors.overlay}
            onPressAddImage={editorPickImage}
            onInsertLink={onInsertLink}
            iconMap={{
              [actions.heading1]: handleHead,
              [actions.heading2]: handleHead2,
              [actions.heading3]: handleHead3,
            }}
            style={{
              backgroundColor: Colors.lightBackgroundSec,
              borderColor: Colors.primary400,
              borderWidth: 1,
              borderRadius: ms(12),
            }}
          />
        </View>
        <Text
          style={{
            textAlign: "left",
            fontFamily: "TajawalBold",
            fontSize: ms(16),
            color: textColor,
          }}
        >
          عن المادة
        </Text>
        <Controller
          control={control}
          defaultValue={data?.aboutSubject || ""}
          name="aboutSubject"
          render={({
            field: { onChange, onBlur },
            fieldState: { error, invalid },
          }) => (
            <>
              <RichEditor
                ref={richText2}
                onBlur={onBlur}
                initialHeight={vs(180)}
                onCursorPosition={handleCursorPosition}
                initialContentHTML={data?.aboutSubject || ""}
                onChange={onChange}
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
        title="تعديل"
        onPress={handleSubmit(onSubmit)}
        style={{
          width: "86%",
          alignSelf: "center",
          marginBottom: vs(12),
        }}
      />
    </ScrollView>
  );
};

export default EditSubjectScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: hs(16),
    paddingVertical: vs(16),
  },
  rich: {
    borderRadius: ms(12),
    overflow: "hidden",
    borderColor: Colors.primary400,
    borderWidth: 1,
  },
});
