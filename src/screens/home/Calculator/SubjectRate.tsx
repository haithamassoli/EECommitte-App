import Dropdown from "@Components/ui/Dropdown";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { View, TextInput } from "react-native";
import { useContext } from "react";

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
];
const markData = [
  { label: "3", value: 3 },
  { label: "2", value: 2 },
  { label: "1", value: 1 },
  { label: "0", value: 0 },
];

type Props = {
  setSelectedGrade: React.Dispatch<React.SetStateAction<undefined>>;
  setSelectedHour: React.Dispatch<React.SetStateAction<undefined>>;
};
const SubjectRate = ({ setSelectedHour, setSelectedGrade }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 100,
          backgroundColor: Colors.lightBackgroundSec,
          borderRadius: 20,
          marginTop: 20,
        }}
      >
        <Dropdown
          label="3"
          style={{ left: 10 }}
          // @ts-ignore
          data={markData}
          // @ts-ignore
          onSelect={setSelectedHour}
        />
      </View>
      <View
        style={{
          width: 174,
          backgroundColor: Colors.lightBackgroundSec,
          borderRadius: 20,
          marginTop: 20,
          paddingVertical: 6,
          paddingHorizontal: 8,
        }}
      >
        <TextInput
          style={{
            fontFamily: "TajawalBold",
            color: textColor,
            fontSize: 18,
            textAlign: "center",
            backgroundColor: Colors.lightBackgroundSec,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          placeholder="(اختياري)"
        />
      </View>
      <View
        style={{
          width: 80,
          backgroundColor: Colors.lightBackgroundSec,
          borderRadius: 20,
          marginTop: 20,
        }}
      >
        <Dropdown
          label="A+"
          style={{ right: 10 }}
          // @ts-ignore
          data={data}
          // @ts-ignore
          onSelect={setSelectedGrade}
        />
      </View>
    </View>
  );
};

export default SubjectRate;
