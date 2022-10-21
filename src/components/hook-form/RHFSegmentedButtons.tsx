// rhf
import { useFormContext, Controller } from 'react-hook-form';
// components
import { SegmentedButtons, SegmentedButtonsProps } from 'react-native-paper';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
};

type Props = IProps & Omit<SegmentedButtonsProps, 'theme' | 'value' | 'onValueChange'>;

// ----------------------------------------------------------------------

export default function RHFSegmentedButtons({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <>
          <SegmentedButtons {...other} value={value} onValueChange={onChange} />
        </>
      )}
    />
  );
}
