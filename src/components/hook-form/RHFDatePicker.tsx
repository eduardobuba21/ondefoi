import { useState } from 'react';
// rhf
import { useFormContext, Controller } from 'react-hook-form';
// components
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, HelperText, TextInputProps } from 'react-native-paper';
import { fDateWritten } from '@src/utils/date';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
};

type Props = IProps & Omit<TextInputProps, 'theme'>;

// ----------------------------------------------------------------------

export default function RHFDatePicker({ name, ...other }: Props) {
  const { control } = useFormContext();

  // ----------------------------------------------------------------------

  const [isOpen, setIsOpen] = useState(false);

  // ----------------------------------------------------------------------

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          {isOpen && (
            <DateTimePicker
              mode="date"
              value={value}
              is24Hour={true}
              onChange={(event, date) => {
                if (event.type === 'set') {
                  setIsOpen(false);
                  onChange(date);
                }
                setIsOpen(false);
              }}
            />
          )}

          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              setIsOpen(true);
            }}
          >
            <View>
              <TextInput
                value={fDateWritten(value)}
                error={!!error}
                mode="outlined"
                editable={false}
                //
                style={{ marginBottom: !!error ? 0 : 12 }}
                {...other}
              />
            </View>
          </TouchableWithoutFeedback>
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
