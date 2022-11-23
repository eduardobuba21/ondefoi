import { useEffect, useState } from 'react';
// components
import { View } from 'react-native';
import { Header } from '@src/components/default';
// hooks
import { useTransactions } from '@src/hooks/useTransactions';
// types
import { ITransaction } from '@src/@types/transaction';
import { TransactionListScreenProps } from '@src/routes/app.routes';
// utils
import {
  TTransactionByDate,
  groupTransactionsByDay,
  filterTransactionsByMonth,
} from '@src/utils/transactions';
// sections
import { MonthSelect } from './sections/list/MonthSelect';
import { MonthSummary } from './sections/list/MonthSummary';
import { MonthTransactions } from './sections/list/MonthTransactions';

// ----------------------------------------------------------------------

type Props = {
  navigation: TransactionListScreenProps['navigation'];
};

// ----------------------------------------------------------------------

export function TransactionList({ navigation }: Props) {
  const { rawTransactions } = useTransactions();

  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  // ----------------------------------------------------------------------

  const [transactions, setTransactions] = useState<{
    byMonth: ITransaction[];
    byMonthGroupedByDay: TTransactionByDate[];
  }>({ byMonth: [], byMonthGroupedByDay: [] });

  const handleTransactionsChange = () => {
    const filtered = filterTransactionsByMonth(rawTransactions, selectedMonth);
    const grouped = groupTransactionsByDay(filtered);

    setTransactions({
      byMonth: filtered,
      byMonthGroupedByDay: grouped,
    });
  };

  useEffect(() => {
    handleTransactionsChange();
  }, [rawTransactions, selectedMonth]);

  // ----------------------------------------------------------------------

  return (
    <View style={{ flex: 1 }}>
      <Header onPressBack={() => navigation.navigate('Home')} title="Transações" />

      <MonthSelect selectedMonth={selectedMonth} onChangeMonth={setSelectedMonth} />

      <MonthSummary transactions={transactions.byMonth} />

      <MonthTransactions transactions={transactions.byMonthGroupedByDay} />
    </View>
  );
}
