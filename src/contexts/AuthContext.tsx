import React, { createContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//
import firebase from '../config/firebase';

const STORAGE_USER = '@finances:user';

// ----------------------------------------------------------------------

interface User {
  id: string;
  name: string;
  email: string;
}

//

interface AuthContextProps {
  isLogged: boolean;
  userStorageLoading: boolean;
  user: User;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// ----------------------------------------------------------------------

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

//

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>({} as User);
  const [isLogged, setIsLogged] = useState(false);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    const user = await AsyncStorage.getItem(STORAGE_USER);

    if (!user) {
      return;
    }

    const userFormated = JSON.parse(user) as User;

    setUser(userFormated);
    setIsLogged(true);
    setUserStorageLoading(false);
  }

  async function signUp(email: string, password: string) {
    try {
      firebase.auth
        .signUp(email, password)
        .then(async (userCredential) => {
          console.log('UP-CREDENTIAL: ', userCredential);
          // const user: User = {
          //   id: userCredential.id,
          //   email: userCredential.email,
          //   name: userCredential.given_name,
          // };
          // await AsyncStorage.setItem(STORAGE_USER, JSON.stringify(user));
          // setUser(user);
          // setIsLogged(true);
        })
        .catch((error: any) => {
          throw new Error(error);
        });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      firebase.auth
        .signIn(email, password)
        .then(async (userCredential) => {
          console.log('IN-CREDENTIAL: ', userCredential);
          // const user: User = {
          //   id: userCredential.id,
          //   email: userCredential.email,
          //   name: userCredential.given_name,
          // };
          // await AsyncStorage.setItem(STORAGE_USER, JSON.stringify(user));
          // setUser(user);
          // setIsLogged(true);
        })
        .catch((error: any) => {
          throw new Error(error);
        });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUserStorageLoading(true);
    await AsyncStorage.removeItem(STORAGE_USER);
    setUser({} as User);
    setIsLogged(false);
    setUserStorageLoading(false);
  }

  return (
    <AuthContext.Provider value={{ isLogged, user, signUp, signIn, signOut, userStorageLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
