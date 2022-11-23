import { useContext } from 'react';
//
import { TransactionsContext } from '@src/contexts/TransactionsContext';

// ----------------------------------------------------------------------

export function useTransactions() {
  return useContext(TransactionsContext);
}
