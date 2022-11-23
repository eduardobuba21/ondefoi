import { ReactNode } from 'react';
// theme
import { theme } from '@src/theme';
// rhf
import { useFormContext, Controller } from 'react-hook-form';
// components
import { Text } from '@src/components/default';
import { View, Text as NText, TextInput, TextInputProps } from 'react-native';
// utils
import { fCurrency } from '@src/utils/formatNumber';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  label: string;
  right?: ReactNode;
};

type Props = IProps & Omit<TextInputProps, 'theme'>;

// ----------------------------------------------------------------------

export default function RHFCurrencyInput({ name, label, right, ...rest }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <View
            style={{
              height: 56,
              borderWidth: 1,
              alignItems: 'center',
              flexDirection: 'row',
              // justifyContent: 'center',
              borderColor: theme.palette.text.disabled,
              borderRadius: theme.props.borderRadius.element,
              ...(!!error && {
                marginBottom: 4,
                borderColor: theme.palette.error.dark,
              }),
            }}
          >
            <NText
              style={{
                height: 56,
                paddingVertical: 12,
                position: 'absolute',
                paddingHorizontal: 24,
                textAlignVertical: 'center',
                color: theme.palette.text.primary,
              }}
            >
              {fCurrency(value)}
            </NText>

            <TextInput
              value={fCurrency(value)}
              onChangeText={(text) => {
                const rawNumber = text.replace(/\D+/g, '');
                const formated = rawNumber.slice(0, -2) + '.' + rawNumber.slice(-2);
                onChange(parseFloat(formated));
              }}
              maxLength={9}
              selection={{ start: 9 }}
              keyboardType="numeric"
              selectionColor="transparent"
              //
              placeholder={label}
              placeholderTextColor={theme.palette.text.faded}
              style={{
                flex: 1,
                fontSize: 14,
                paddingVertical: 12,
                paddingHorizontal: 24,

                //
                color: 'transparent',
              }}
              {...rest}
            />

            <View style={{ paddingVertical: 2, paddingRight: 16 }}>{right}</View>
          </View>

          {!!error && (
            <Text variant="body2" style={{ color: theme.palette.error.dark }}>
              {error?.message}
            </Text>
          )}
        </>
      )}
    />
  );
}
