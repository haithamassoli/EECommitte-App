import { Controller, Control } from "react-hook-form";
import { TextInput, HelperText } from "react-native-paper";

type ControlledInputProps = {
  control: Control<any>;
  name: string;
  width?: string | number;
  withError?: boolean;
} & React.ComponentProps<typeof TextInput>;

const ControlledInput = ({
  control,
  name,
  width,
  withError = true,
  ...textInputProps
}: ControlledInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error, invalid },
      }) => (
        <>
          <TextInput
            {...textInputProps}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={invalid}
          />
          {withError && (
            <HelperText
              type="error"
              visible={invalid}
              style={{
                textAlign: "left",
                width: "100%",
              }}
            >
              {error?.message}
            </HelperText>
          )}
        </>
      )}
    />
  );
};

export default ControlledInput;
