import ControlledInput from "@Components/controlledInput";
import CustomButton from "@Components/ui/customButton";
import Loading from "@Components/ui/loading";
import Colors from "@GlobalStyle/Colors";
import {
  addRecordMutation,
  deleteRecordMutation,
  fetchRecordsQuery,
  updateRecordMutation,
} from "@Src/api/fetchRecords";
import { useImagePicker } from "@Src/hooks/useImagePicker";
import { useColorScheme } from "@Src/store/themeContext";
import {
  ValidationAddOurExplanationsSchemaType,
  ValidationOurExplanationsSchemaType,
  validationAddOurExplanationsSchema,
} from "@Types/schema";
import { screenWidth } from "@Utils/Helper";
import { hs, ms, vs } from "@Utils/Platform";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useForm } from "react-hook-form";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";

const ManageRecordsScreen = () => {
  const { data, isLoading, refetch } = fetchRecordsQuery();
  const [mainImage, pickMainImage, isLoadingMainImage] = useImagePicker();
  const { mutate: addRecord, isLoading: isAdding } = addRecordMutation();
  const { mutate, isLoading: isUpdating } = updateRecordMutation();
  const { mutate: deleteRecord, isLoading: isDeleting } =
    deleteRecordMutation();
  const { theme } = useColorScheme();
  const { control, handleSubmit } =
    useForm<ValidationOurExplanationsSchemaType>();
  const { control: addControl, handleSubmit: addHandleSubmit } =
    useForm<ValidationAddOurExplanationsSchemaType>({
      resolver: zodResolver(validationAddOurExplanationsSchema),
    });

  const backgroundColor =
    theme === "light" ? Colors.lightBackgroundSec : Colors.darkBackgroundSec;

  const onSubmit = (
    FormData: ValidationOurExplanationsSchemaType,
    index: number
  ) => {
    mutate(
      {
        doctor: FormData.doctor[index],
        image: mainImage[0] || FormData.image[index],
        link: FormData.link[index],
        searchName: FormData.searchName[index],
        time: new Date(),
        id: FormData.id[index],
        subject: FormData.subject[index],
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

  const onAdding = (FormData: ValidationAddOurExplanationsSchemaType) => {
    addRecord(
      {
        doctor: FormData.doctor,
        image: mainImage[0],
        link: FormData.link,
        searchName: FormData.searchName,
        time: new Date(),
        subject: FormData.subject,
      },
      {
        onSuccess: () => {
          Alert.alert("تم إضافة الشرخ بنجاح", "", [
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
    deleteRecord(id, {
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

  const renderItem = ({ item, index }: any) => (
    <>
      {index === 0 && (
        <View style={[styles.container, { backgroundColor }]}>
          <View style={[styles.innerContainer, { backgroundColor }]}>
            <View>
              {(isLoadingMainImage || isAdding || isDeleting) && (
                <Loading size="small" />
              )}
              <Image
                style={styles.image}
                contentFit="contain"
                source={mainImage[0] || null}
                placeholder={require("@Assets/images/bookPlacholder.jpg")}
                transition={400}
                placeholderContentFit="contain"
              />
              <CustomButton
                title="إضافة صورة"
                onPress={pickMainImage}
                labelStyle={{
                  height: vs(46),
                }}
                style={{
                  height: vs(22),
                  marginTop: vs(4),
                }}
              />
            </View>
            <View style={styles.textContainer}>
              <ControlledInput
                control={addControl}
                withError={false}
                name={`subject`}
                mode="outlined"
                placeholder="ادخل اسم المادة"
                label={"اسم المادة"}
                outlineStyle={{
                  borderRadius: ms(18),
                  height: vs(28),
                }}
                contentStyle={{
                  height: vs(28),
                }}
              />
              <ControlledInput
                control={addControl}
                withError={false}
                name={`image`}
                style={{
                  display: "none",
                }}
              />
              <ControlledInput
                control={addControl}
                withError={false}
                name={`id.`}
                style={{
                  display: "none",
                }}
              />
              <ControlledInput
                control={addControl}
                withError={false}
                name={`doctor.`}
                mode="outlined"
                placeholder="ادخل اسم صاحب الشرح"
                label={"صاحب الشرح"}
                outlineStyle={{
                  borderRadius: ms(18),
                  height: vs(28),
                }}
                contentStyle={{
                  height: vs(28),
                }}
              />
              <ControlledInput
                control={addControl}
                withError={false}
                name={`link`}
                mode="outlined"
                placeholder="ادخل رابط الشرح"
                label={"رابط الشرح"}
                outlineStyle={{
                  borderRadius: ms(18),
                  height: vs(28),
                }}
                contentStyle={{
                  height: vs(28),
                }}
              />
              <ControlledInput
                control={addControl}
                withError={false}
                name={`searchName`}
                mode="outlined"
                placeholder="ادخل كلمات مفتاحية للبحث"
                label={"كلمات مفتاحية للبحث"}
                outlineStyle={{
                  borderRadius: ms(18),
                  height: vs(28),
                }}
                contentStyle={{
                  height: vs(28),
                }}
              />
            </View>
          </View>
          <CustomButton title="إضافة" onPress={addHandleSubmit(onAdding)} />
        </View>
      )}
      <View style={[styles.container, { backgroundColor }]}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}
        >
          <Feather name="x" size={ms(24)} color={Colors.secondYear} />
        </TouchableOpacity>
        <View style={[styles.innerContainer, { backgroundColor }]}>
          <View>
            {isLoadingMainImage && <Loading size="small" />}
            <Image
              style={styles.image}
              contentFit="contain"
              source={mainImage[0] || item.image}
              placeholder={require("@Assets/images/bookPlacholder.jpg")}
              transition={400}
              placeholderContentFit="contain"
            />
            <CustomButton
              title="إضافة صورة جديدة"
              onPress={pickMainImage}
              labelStyle={{
                height: vs(46),
              }}
              style={{
                height: vs(22),
                marginTop: vs(4),
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <ControlledInput
              control={control}
              withError={false}
              defaultValue={item.subject}
              name={`subject.${index}`}
              mode="outlined"
              placeholder="ادخل اسم المادة"
              label={"اسم المادة"}
              outlineStyle={{
                borderRadius: ms(18),
                height: vs(28),
              }}
              contentStyle={{
                height: vs(28),
              }}
            />
            <ControlledInput
              control={control}
              withError={false}
              defaultValue={item.image}
              name={`image.${index}`}
              style={{
                display: "none",
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
            <ControlledInput
              control={control}
              withError={false}
              defaultValue={item.doctor}
              name={`doctor.${index}`}
              mode="outlined"
              placeholder="ادخل اسم صاحب الشرح"
              label={"صاحب الشرح"}
              outlineStyle={{
                borderRadius: ms(18),
                height: vs(28),
              }}
              contentStyle={{
                height: vs(28),
              }}
            />
            <ControlledInput
              control={control}
              withError={false}
              defaultValue={item.link}
              name={`link.${index}`}
              mode="outlined"
              placeholder="ادخل رابط الشرح"
              label={"رابط الشرح"}
              outlineStyle={{
                borderRadius: ms(18),
                height: vs(28),
              }}
              contentStyle={{
                height: vs(28),
              }}
            />
            <ControlledInput
              control={control}
              withError={false}
              defaultValue={item.searchName}
              name={`searchName.${index}`}
              mode="outlined"
              placeholder="ادخل كلمات مفتاحية للبحث"
              label={"كلمات مفتاحية للبحث"}
              outlineStyle={{
                borderRadius: ms(18),
                height: vs(28),
                width: "100%",
                overflow: "hidden",
              }}
              contentStyle={{
                height: vs(28),
                width: "100%",
                overflow: "hidden",
              }}
              style={{
                width: "100%",
                overflow: "hidden",
              }}
              textBreakStrategy="balanced"
            />
          </View>
        </View>
        <CustomButton
          title="تعديل"
          onPress={handleSubmit((item) => onSubmit(item, index))}
        />
      </View>
    </>
  );

  if (isLoading || isUpdating) return <Loading />;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1, marginHorizontal: hs(12) }}>
        <FlashList
          data={data}
          contentContainerStyle={{ paddingBottom: vs(12) }}
          keyboardShouldPersistTaps="handled"
          keyExtractor={(item) => item.id}
          estimatedItemSize={100}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};
export default ManageRecordsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: vs(12),
    paddingHorizontal: hs(16),
    paddingVertical: vs(16),
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: screenWidth * 0.42,
    height: vs(110),
  },
  textContainer: {
    flex: 1,
    marginStart: hs(10),
  },
  deleteButton: {
    position: "absolute",
    left: hs(8),
    top: vs(8),
    zIndex: 10,
  },
});
