import { useEffect, useState } from 'react';
// hooks
import { useAuth } from '@src/hooks/useAuth';
import { useTheme } from '@src/hooks/useTheme';
// components
import { View } from 'react-native';
import { List, Appbar, Divider, IconButton } from 'react-native-paper';
// types
import { TMonthRef } from '@src/@types/common';
import { ITransaction } from '@src/@types/transaction';
// utils
import { alpha } from '@src/utils/theme';
import { createPeriodList, fDateWritten, isSameMonth } from '@src/utils/date';
import { fCurrency } from '@src/utils/formatNumber';
import { dbMethods } from '@src/utils/firebase/database';
// sections
import { PeriodList } from './PeriodList';

// ----------------------------------------------------------------------

type TransactionByDate = { date: string; label: string; transactions: ITransaction[] };

// ----------------------------------------------------------------------

export function Home() {
  const theme = useTheme();
  const { signOut } = useAuth();

  // ----------------------------------------------------------------------

  const [transactions, setTransactions] = useState<TransactionByDate[]>([]);
  const [periodList, setPeriodList] = useState<TMonthRef[]>([]);

  useEffect(() => {
    setPeriodList(createPeriodList());

    const subscribe = dbMethods().transactions.index((data) => {
      const groupByDate = (_data: ITransaction[]) => {
        // group by date
        const groups = _data.reduce((groups, transaction) => {
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

      const grouped = groupByDate(data);

      setTransactions(grouped);
    });

    return () => subscribe();
  }, []);

  // ----------------------------------------------------------------------

  const [filteredTransactions, setFilteredTransactions] = useState<TransactionByDate[]>([]);

  const filterByMonth = (date: Date) => {
    setFilteredTransactions(
      transactions.filter((_transactionGroup) =>
        isSameMonth(new Date(_transactionGroup.date), date)
      )
    );
  };

  // ----------------------------------------------------------------------

  return (
    <View>
      <Appbar.Header elevated>
        <Appbar.Content title="Início" />
        <Appbar.Action icon="exit-to-app" onPress={signOut} />
      </Appbar.Header>

      <View style={{ paddingVertical: 5, backgroundColor: theme.colors.backdrop }}>
        <PeriodList periodList={periodList} onChange={filterByMonth} />
      </View>

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
    </View>
  );
}
