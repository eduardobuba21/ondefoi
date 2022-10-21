import { db, auth } from './firebase';
//
import { addDoc, doc, collection, DocumentData } from 'firebase/firestore';
// types
import { TTransactionCreate } from '@src/@types/transaction';

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
          return addDoc(transactionsColRef, data);
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
