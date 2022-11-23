import React, { createContext, ReactNode, useState, useEffect } from 'react';
// types
import { ITransaction } from '@src/@types/transaction';
// utils
import { dbMethods } from '@src/utils/firebase/database';

// ----------------------------------------------------------------------

interface TransactionsContextProps {
  rawTransactions: ITransaction[];
}

// ----------------------------------------------------------------------

interface Props {
  children: ReactNode;
}

//

export function TransactionsProvider({ children }: Props) {
  const [rawTransactions, setRawTransactions] = useState<
    TransactionsContextProps['rawTransactions']
  >([]);

  useEffect(() => {
    const subscribe = dbMethods().transactions.index((data) => {
      setRawTransactions(data);
    });

    return () => subscribe();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        rawTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

// ----------------------------------------------------------------------

export const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
);
