import React, { createContext, ReactNode, useState, useEffect } from 'react';
// types
import { IUser, IUserAuth } from '@src/@types/user';
// utils
import { auth } from '@src/utils/firebase/firebase';
import { authMethods } from '@src/utils/firebase/auth';
import { dbMethods } from '@src/utils/firebase/database';
import { onAuthStateChanged } from 'firebase/auth/react-native';

// ----------------------------------------------------------------------

interface AuthContextProps {
  isLoading: boolean;
  isLogged: boolean;
  user: (IUser & IUserAuth) | null;
  signOut: () => Promise<void>;
}

// ----------------------------------------------------------------------

interface Props {
  children: ReactNode;
}

//

export function AuthProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<AuthContextProps['user']>(null);

  useEffect(() => {
    const onAuthStateChange = onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        const _userData = await dbMethods().user.show();
        const userData: IUser & IUserAuth = {
          id: _user.uid,
          email: _user.email || '',
          ..._userData,
        };
        setUser(userData);
        setIsLogged(true);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLogged(false);
        setIsLoading(false);
      }
    });

    return onAuthStateChange;
  }, []);

  async function signOut() {
    authMethods().signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLogged,
        user,
        //
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ----------------------------------------------------------------------

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
