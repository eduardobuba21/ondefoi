// ----------------------------------------------------------------------

export interface ITransaction {
  id: string;
  description: string;
  value: number;
  type: 'entry' | 'exit';
  occurred_at: Date;
  // category: string | null;
}

// ----------------------------------------------------------------------

export type TTransactionCreate = {
  description: string;
  value: number;
  type: 'entry' | 'exit';
  occurred_at: Date;
  // category: string | null;
};

// ----------------------------------------------------------------------

export type TTransactionUpdate = {
  description: string;
  value: number;
  occurred_at: Date;
  // category: string | null;
};
