// hooks
import { useTheme } from '@src/hooks/useTheme';
// components
import { View } from 'react-native';
import { Text } from 'react-native-paper';
// utils
import { fCurrency } from '@src/utils/formatNumber';
import { ITransaction } from '@src/@types/transaction';

// ----------------------------------------------------------------------

type Props = {
  transactions: ITransaction[];
};

// ----------------------------------------------------------------------

export function Summary({ transactions }: Props) {
  const theme = useTheme();

  // ----------------------------------------------------------------------

  const summary = transactions.reduce(
    (accumulator, item) => {
      if (item.type === 'exit') {
        return {
          ...accumulator,
          exit: accumulator.exit + item.value,
        };
      }
      return {
        ...accumulator,
        entry: accumulator.entry + item.value,
      };
    },
    { exit: 0, entry: 0 }
  );

  // ----------------------------------------------------------------------

  return (
    <View
      style={{
        backgroundColor: theme.colors.backdrop,
        height: 80,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <SideText label="ganhos" value={fCurrency(summary.entry)} />

      <CenterText label="resultado" value={fCurrency(summary.entry - summary.exit)} />

      <SideText label="despesas" value={'-' + fCurrency(summary.exit)} />
    </View>
  );
}

// ----------------------------------------------------------------------

type LabelProps = {
  label: string;
  value: string;
};

function CenterText({ label, value }: LabelProps) {
  return (
    <View style={{ flex: 1 }}>
      <Text variant="labelLarge" style={{ textAlign: 'center' }}>
        {label}
      </Text>
      <Text variant="titleLarge" style={{ fontWeight: 'bold', textAlign: 'center' }}>
        {value}
      </Text>
    </View>
  );
}

function SideText({ label, value }: LabelProps) {
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Text variant="labelMedium" style={{ textAlign: 'center', color: theme.colors.secondary }}>
        {label}
      </Text>
      <Text
        variant="titleMedium"
        style={{ fontWeight: 'bold', textAlign: 'center', color: theme.colors.secondary }}
      >
        {value}
      </Text>
    </View>
  );
}
