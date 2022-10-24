import { db, auth } from './firebase';
//
import { doc, addDoc, collection, onSnapshot } from 'firebase/firestore';
// types
import { ITransaction, TTransactionCreate } from '@src/@types/transaction';
// utils
import { startOfDay } from 'date-fns';
import { pt } from 'date-fns/locale';

// ----------------------------------------------------------------------

class dbService {
  constructor(readonly userId: string) {}

  dbMethods() {
    const userDocRef = doc(db, 'users', this.userId);
    //
    const transactionsColRef = collection(userDocRef, 'transactions');

    return {
      transactions: {
        create: (data: TTransactionCreate) => {
          return addDoc(transactionsColRef, {
            ...data,
            occurred_at: startOfDay(data.occurred_at),
          } as TTransactionCreate);
        },

        index: (callback: (data: ITransaction[]) => void) => {
          return onSnapshot(transactionsColRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
                occurred_at: doc.data().occurred_at.toDate(),
              } as ITransaction;
            });
            callback(data);
          });
        },
      },
    };
  }
}

// ----------------------------------------------------------------------

const dbMethods = () => {
  const instance = new dbService(auth.currentUser!.uid);
  return instance.dbMethods();
};

// ----------------------------------------------------------------------

export { dbMethods };
