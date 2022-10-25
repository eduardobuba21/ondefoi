// rhf
import { useFormContext, Controller } from 'react-hook-form';
// components
import { TextInput, HelperText, TextInputProps } from 'react-native-paper';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
};

type Props = IProps & Omit<TextInputProps, 'theme'>;

// ----------------------------------------------------------------------

export default function RHFTextInput({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <TextInput
            value={value ? value + '' : ''}
            onChangeText={onChange}
            error={!!error}
            mode="outlined"
            //
            style={{ marginBottom: !!error ? 0 : 12 }}
            {...other}
          />
          {!!error && (
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          )}
        </>
      )}
    />
  );
}
