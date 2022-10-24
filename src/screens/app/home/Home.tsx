import { useEffect, useState } from 'react';
// hooks
import { useAuth } from '@src/hooks/useAuth';
// components
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
// types
import { ITransaction } from '@src/@types/transaction';
// utils
import { dbMethods } from '@src/utils/firebase/database';
import {
  TTransactionByDate,
  groupTransactionsByDay,
  filterTransactionsByMonth,
} from './sections/transactionService';
// sections
import { Summary } from './sections/Summary';
import { MonthSelect } from './sections/MonthSelect';
import { TransactionList } from './sections/TransactionList';

// ----------------------------------------------------------------------

export function Home() {
  const { signOut } = useAuth();

  // ----------------------------------------------------------------------

  const [rawTransactions, setRawTransactions] = useState<ITransaction[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  useEffect(() => {
    const subscribe = dbMethods().transactions.index((data) => {
      setRawTransactions(data);
    });

    return () => subscribe();
  }, []);

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
      <Appbar.Header elevated>
        <Appbar.Content title="Início" />
        <Appbar.Action icon="exit-to-app" onPress={signOut} />
      </Appbar.Header>

      <MonthSelect selectedMonth={selectedMonth} onChangeMonth={setSelectedMonth} />

      <Summary transactions={transactions.byMonth} />

      <TransactionList transactions={transactions.byMonthGroupedByDay} />
    </View>
  );
}
