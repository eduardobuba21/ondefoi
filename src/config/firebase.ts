import { initializeApp } from 'firebase/app';
//
import {
  initializeAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';

// ----------------------------------------------------------------------

const firebaseConfig = {
  apiKey: 'AIzaSyCt13lmQXGydD3HY-K6ar5OqAO1bAH0aWE',
  authDomain: 'ebuba-finances.firebaseapp.com',
  projectId: 'ebuba-finances',
  storageBucket: 'ebuba-finances.appspot.com',
  messagingSenderId: '271657069274',
  appId: '1:271657069274:web:55db852e59652a01cf53e3',
};

// ----------------------------------------------------------------------

const _app = initializeApp(firebaseConfig);

const _auth = initializeAuth(_app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// ----------------------------------------------------------------------
// auth

const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(_auth, email, password);
};

const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(_auth, email, password);
};

const createUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(_auth, email, password);
};

const auth = {
  signUp,
  signIn,
  createUser,
};

// ----------------------------------------------------------------------

export default { auth };
