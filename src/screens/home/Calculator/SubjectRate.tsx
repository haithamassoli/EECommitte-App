import Dropdown from "@Components/ui/Dropdown";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { View, TextInput, StyleSheet } from "react-native";
import { useContext } from "react";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { screenWidth } from "@Utils/Helper";

const data = [
  { label: "A+", value: 4.2 },
  { label: "A", value: 4 },
  { label: "A-", value: 3.75 },
  { label: "B+", value: 3.5 },
  { label: "B", value: 3.25 },
  { label: "B-", value: 3 },
  { label: "C+", value: 2.75 },
  { label: "C", value: 2.5 },
  { label: "C-", value: 2.25 },
  { label: "D+", value: 2 },
  { label: "D", value: 1.75 },
  { label: "D-", value: 1.5 },
  { label: "F", value: 0.5 },
];
const markData = [
  { label: "3", value: 3 },
  { label: "2", value: 2 },
  { label: "1", value: 1 },
  { label: "0", value: 0 },
];

type Props = {
  setSelectedGrade: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        value: number;
      }[]
    >
  >;
  setSelectedHour: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        value: number;
      }[]
    >
  >;
  itemNumber: number;
};
const SubjectRate = ({
  setSelectedHour,
  setSelectedGrade,
  itemNumber,
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.row,
          {
            backgroundColor:
              theme === "light"
                ? Colors.lightBackgroundSec
                : Colors.darkBackgroundSec,
          },
        ]}
      >
        <Dropdown
          label="3"
          style={styles.dropdown}
          // @ts-ignore
          data={markData}
          // @ts-ignore
          onSelect={setSelectedHour}
          itemNumber={itemNumber}
        />
      </View>
      <View
        style={[
          styles.row2,
          {
            backgroundColor:
              theme === "light"
                ? Colors.lightBackgroundSec
                : Colors.darkBackgroundSec,
          },
        ]}
      >
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor:
                theme === "light"
                  ? Colors.lightBackgroundSec
                  : Colors.darkBackgroundSec,
              color: textColor,
            },
          ]}
          placeholder="(اختياري)"
          placeholderTextColor={"gray"}
        />
      </View>
      <View
        style={[
          styles.row,
          {
            backgroundColor:
              theme === "light"
                ? Colors.lightBackgroundSec
                : Colors.darkBackgroundSec,
          },
        ]}
      >
        <Dropdown
          label="A+"
          style={{ right: horizontalScale(10) }}
          // @ts-ignore
          data={data}
          // @ts-ignore
          onSelect={setSelectedGrade}
          itemNumber={itemNumber}
        />
      </View>
    </View>
  );
};

export default SubjectRate;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdown: { left: horizontalScale(10) },
  row: {
    width: (screenWidth - horizontalScale(174)) / 2 - 8,
    borderRadius: moderateScale(20),
    marginTop: verticalScale(20),
  },
  row2: {
    width: horizontalScale(174 - 32),
    borderRadius: moderateScale(20),
    marginTop: verticalScale(20),
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(8),
  },
  textInput: {
    fontFamily: "TajawalBold",
    fontSize: moderateScale(18),
    textAlign: "center",
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(8),
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
});
