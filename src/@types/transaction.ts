// ----------------------------------------------------------------------

export interface ITransaction {
  id: string;
  description: string;
  value: number;
  type: 'entry' | 'exit';
  occurred_at: Date;
}

// ----------------------------------------------------------------------

export type TTransactionCreate = {
  description: string;
  value: number;
  type: 'entry' | 'exit';
  occurred_at: Date;
};

// ----------------------------------------------------------------------

type TTransactionUpdatable = {
  description: string;
  value: number;
  type: 'entry' | 'exit';
  occurred_at: Date;
};

export type TTransactionUpdate = Partial<TTransactionUpdatable>;
