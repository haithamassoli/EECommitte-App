import ControlledInput from "@Components/controlledInput";
import CustomButton from "@Components/ui/customButton";
import Loading from "@Components/ui/loading";
import Colors from "@GlobalStyle/Colors";
import {
  addDoctorMutation,
  deleteDoctorMutation,
  fetchDoctorsQuery,
  updateDoctorMutation,
} from "@Src/api/fetchDoctors";
import { useImagePicker } from "@Src/hooks/useImagePicker";
import { useColorScheme } from "@Src/store/themeContext";
import {
  ValidationAddOurExplanationsSchemaType,
  ValidationOurExplanationsSchemaType,
  validationAddOurExplanationsSchema,
} from "@Types/schema";
import { hs, ms, vs } from "@Utils/Platform";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useForm } from "react-hook-form";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";

const defaultImage = require("@Assets/images/person-placeholder.jpg");

const ManageDoctorsScreen = () => {
  const { data, isLoading, refetch } = fetchDoctorsQuery();
  const [mainImage, pickMainImage, isLoadingMainImage] = useImagePicker();
  const { mutate: addDoctor, isLoading: isAdding } = addDoctorMutation();
  const { mutate, isLoading: isUpdating } = updateDoctorMutation();
  const { mutate: deleteDoctor, isLoading: isDeleting } =
    deleteDoctorMutation();
  const { theme } = useColorScheme();

  const { control, handleSubmit } =
    useForm<ValidationOurExplanationsSchemaType>();
  const { control: addControl, handleSubmit: addHandleSubmit } =
    useForm<ValidationAddOurExplanationsSchemaType>({
      resolver: zodResolver(validationAddOurExplanationsSchema),
    });

  const backgroundColor =
    theme === "light" ? Colors.lightBackgroundSec : Colors.darkBackgroundSec;

  const onSubmit = (FormData: any, index: number) => {
    mutate(
      {
        id: FormData.id[index],
        image: mainImage[0] || FormData.image[index],
        name: FormData.name[index],
        name2: FormData.name2[index],
        email: FormData.email[index],
        office: FormData.office[index],
        phone: FormData.phone[index],
        website: FormData.website[index],
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
    addDoctor(
      {
        name: FormData.name,
        name2: FormData.name2,
        email: FormData.email,
        image: mainImage[0],
        office: FormData.office,
        phone: FormData.phone,
        website: FormData.website,
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
    deleteDoctor(id, {
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
                placeholder={defaultImage}
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
                name={`name`}
                mode="outlined"
                placeholder="ادخل اسم الدكتور"
                label={"اسم الدكتور"}
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
                name={`name2`}
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
              <ControlledInput
                control={addControl}
                withError={false}
                name={`email`}
                mode="outlined"
                placeholder="ادخل البريد الإلكتروني للدكتور"
                label={"البريد الإلكتروني للدكتور"}
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
                name={`office`}
                mode="outlined"
                placeholder="ادخل مكتب الدكتور"
                label={"مكتب الدكتور"}
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
                name={`phone`}
                mode="outlined"
                placeholder="ادخل رقم الهاتف للدكتور"
                label={"رقم الهاتف للدكتور"}
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
                name={`website`}
                mode="outlined"
                placeholder="ادخل صفحة الدكتور في موقع الجامعة"
                label={"صفحة الدكتور في موقع الجامعة"}
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
              placeholder={defaultImage}
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
              defaultValue={item.name}
              name={`name.${index}`}
              mode="outlined"
              placeholder="ادخل اسم الدكتور"
              label={"اسم الدكتور"}
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
              defaultValue={item.name2}
              name={`name2.${index}`}
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
              defaultValue={item.email}
              name={`email.${index}`}
              mode="outlined"
              placeholder="ادخل البريد الإلكتروني للدكتور"
              label={"البريد الإلكتروني للدكتور"}
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
              defaultValue={item.office}
              name={`office.${index}`}
              mode="outlined"
              placeholder="ادخل مكتب الدكتور"
              label={"مكتب الدكتور"}
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
              defaultValue={item.phone}
              name={`phone.${index}`}
              mode="outlined"
              placeholder="ادخل رقم الهاتف للدكتور"
              label={"رقم الهاتف للدكتور"}
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
            <ControlledInput
              control={control}
              withError={false}
              defaultValue={item.website}
              name={`website.${index}`}
              mode="outlined"
              placeholder="ادخل صفحة الدكتور في موقع الجامعة"
              label={"صفحة الدكتور في موقع الجامعة"}
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
export default ManageDoctorsScreen;

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
    // width: screenWidth * 0.42,
    // height: vs(110),
    alignSelf: "center",
    width: hs(100),
    height: vs(150),
    borderRadius: ms(12),
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
