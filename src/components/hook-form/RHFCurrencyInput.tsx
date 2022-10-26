// rhf
import { useFormContext, Controller } from 'react-hook-form';
// components
import { Text, View } from 'react-native';
import { TextInput, HelperText, TextInputProps } from 'react-native-paper';
// utils
import { fCurrency } from '@src/utils/formatNumber';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
};

type Props = IProps & Omit<TextInputProps, 'theme'>;

// ----------------------------------------------------------------------

export default function RHFCurrencyInput({ name, ...other }: Props) {
  const { control } = useFormContext();

  // ----------------------------------------------------------------------

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={{ position: 'relative' }}>
          <TextInput
            value={fCurrency(value)}
            onChangeText={(text) => {
              const rawNumber = text.replace(/\D+/g, '');
              const formated = rawNumber.slice(0, -2) + '.' + rawNumber.slice(-2);
              onChange(parseFloat(formated));
            }}
            maxLength={9}
            selection={{ start: 9 }}
            error={!!error}
            mode="outlined"
            keyboardType="numeric"
            selectionColor="rgba(0,0,0,0)"
            textColor="rgba(0,0,0,0)"
            style={{ marginBottom: !!error ? 0 : 12 }}
            {...other}
          />
          {!!error && (
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          )}

          <Text
            style={{
              position: 'absolute',
              color: '#FFF',
              height: 64,
              fontSize: 16,
              paddingLeft: 16,
              textAlignVertical: 'center',
            }}
          >
            {fCurrency(value)}
          </Text>
        </View>
      )}
    />
  );
}
