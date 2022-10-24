import { useEffect, useState } from 'react';
// hooks
import { useTheme } from '@src/hooks/useTheme';
// components
import { View } from 'react-native';
import { List, Divider, IconButton } from 'react-native-paper';
// types
import { ITransaction } from '@src/@types/transaction';
// utils
import { alpha } from '@src/utils/theme';
import { fCurrency } from '@src/utils/formatNumber';
import { fDateWritten, isSameMonth } from '@src/utils/date';

// ----------------------------------------------------------------------

type TransactionByDate = { date: string; label: string; transactions: ITransaction[] };

type Props = {
  transactions: ITransaction[];
  selectedMonth: Date;
};

// ----------------------------------------------------------------------

export function TransactionList({ transactions, selectedMonth }: Props) {
  const theme = useTheme();

  // ----------------------------------------------------------------------

  const groupTransactionsByDate = (transactions: ITransaction[]) => {
    // group by date
    const groups = transactions.reduce((groups, transaction) => {
      const date = transaction.occurred_at.toISOString().split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {} as { [key: string]: ITransaction[] });

    // normalize
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        label: fDateWritten(date + 'T03:00:00.000Z'),
        transactions: groups[date],
      };
    });

    return groupArrays;
  };

  const filterTransactionsByMonth = (date: Date) => {
    const grouped = groupTransactionsByDate(transactions); // TODO: group only after filtering

    return grouped.filter((_transactionGroup) =>
      isSameMonth(new Date(_transactionGroup.date), date)
    );
  };

  // ----------------------------------------------------------------------

  const [filteredTransactions, setFilteredTransactions] = useState<TransactionByDate[]>([]);

  useEffect(() => {
    setFilteredTransactions(groupTransactionsByDate(transactions));
  }, [transactions]);

  useEffect(() => {
    setFilteredTransactions(filterTransactionsByMonth(selectedMonth));
  }, [selectedMonth]);

  // ----------------------------------------------------------------------

  return (
    <List.Section>
      {filteredTransactions.map((transactionsGroup) => (
        <View key={transactionsGroup.date}>
          <List.Subheader>{transactionsGroup.label}</List.Subheader>
          <Divider />

          {transactionsGroup.transactions.map((transaction) => (
            <View key={transaction.id}>
              <List.Item
                title={transaction.description}
                description={'R$ ' + fCurrency(transaction.value)}
                left={() => {
                  const isExit = transaction.type === 'exit';
                  return (
                    <List.Icon
                      icon={isExit ? 'call-made' : 'call-received'}
                      color={isExit ? theme.palette.error.light : theme.palette.primary.light}
                      style={{
                        backgroundColor: isExit
                          ? alpha(theme.palette.error.light, 0.1)
                          : alpha(theme.palette.primary.light, 0.1),
                        borderRadius: 100,
                      }}
                    />
                  );
                }}
                right={() => <IconButton icon="pencil" size={20} onPress={() => {}} />}
              />
              <Divider />
            </View>
          ))}
        </View>
      ))}
    </List.Section>
  );
}
