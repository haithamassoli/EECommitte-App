import Loading from "@Components/ui/loading";
import { updateSubjectMutation } from "@Src/api/fetchSubjectById";
import { View, Text } from "react-native";

const EditSubjectScreen = () => {
  const { mutate, isLoading } = updateSubjectMutation();

  if (isLoading) return <Loading />;

  return (
    <View>
      <Text>EditSubjectScreen</Text>
    </View>
  );
};

export default EditSubjectScreen;
