import { auth, db } from './firebase';
//
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth/react-native';
import { doc, setDoc } from 'firebase/firestore';

// ----------------------------------------------------------------------

class authService {
  constructor() {}

  authMethods() {
    return {
      signUp: async (email: string, password: string, nickname: string) => {
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
          return setDoc(doc(db, 'users', userCredential.user.uid), {
            nickname: nickname,
            created_at: new Date(),
          });
        });
      },

      signIn: (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
      },

      signOut: () => {
        signOut(auth);
      },
    };
  }
}

// ----------------------------------------------------------------------

const authMethods = () => {
  const instance = new authService();
  return instance.authMethods();
};

// ----------------------------------------------------------------------

export { authMethods };
