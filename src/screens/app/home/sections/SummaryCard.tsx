// hooks
import { useTheme } from '@src/hooks/useTheme';
import { useTransactions } from '@src/hooks/useTransactions';
// components
import { View } from 'react-native';
import { Text } from '@src/components/default';
// utils
import { fCurrency } from '@src/utils/formatNumber';
import { filterTransactionsByMonth } from '@src/utils/transactions';

// ----------------------------------------------------------------------

export function SummaryCard() {
  const theme = useTheme();
  const { rawTransactions } = useTransactions();

  const getCurrentMonthResult = () => {
    const currentMonthTransactions = filterTransactionsByMonth(rawTransactions, new Date());

    const currentMonthResult = currentMonthTransactions.reduce((accumulator, transaction) => {
      if (transaction.type === 'entry') {
        return accumulator + transaction.value;
      } else {
        return accumulator - transaction.value;
      }
    }, 0);

    return currentMonthResult;
  };

  return (
    <View
      style={{
        padding: 22,
        display: 'flex',
        borderRadius: theme.props.borderRadius.card,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Text
        variant="h4"
        style={{
          color: theme.palette.text.secondary,
          fontWeight: theme.font.weights.medium,
        }}
      >
        Resultado do mês
      </Text>

      <Text variant="h1" style={{ marginTop: 6 }}>
        R$ {fCurrency(getCurrentMonthResult()) || '-,--'}
      </Text>
    </View>
  );
}
