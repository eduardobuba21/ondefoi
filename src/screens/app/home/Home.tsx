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
// sections
import { MonthList } from './MonthList';
import { TransactionList } from './TransactionList';

// ----------------------------------------------------------------------

export function Home() {
  const { signOut } = useAuth();

  // ----------------------------------------------------------------------

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  useEffect(() => {
    const subscribe = dbMethods().transactions.index((data) => {
      setTransactions(data);
    });

    return () => subscribe();
  }, []);

  // ----------------------------------------------------------------------

  return (
    <View>
      <Appbar.Header elevated>
        <Appbar.Content title="Início" />
        <Appbar.Action icon="exit-to-app" onPress={signOut} />
      </Appbar.Header>

      <MonthList selectedMonth={selectedMonth} onChangeMonth={setSelectedMonth} />

      <TransactionList transactions={transactions} selectedMonth={selectedMonth} />
    </View>
  );
}
