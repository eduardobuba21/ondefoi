import React, { useState } from 'react';
// components
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
// utils
import firebase from '@src/utils/firebase';

// ----------------------------------------------------------------------

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isPwdHidden, setIsPwdHidden] = useState(false);

  function handleSignIn() {
    if (isLoading) return;
    setIsLoading(true);

    firebase.auth.signIn(email, password).catch((error) => {
      setIsLoading(false);
      console.log('[buba] firebase/auth/sign-in - error: ', error.code);
    });
  }

  return (
    <View>
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 12 }}
      />
      <TextInput
        mode="outlined"
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={isPwdHidden}
        right={
          <TextInput.Icon
            icon={isPwdHidden ? 'eye' : 'eye-off'}
            onPress={() => setIsPwdHidden(!isPwdHidden)}
          />
        }
      />

      <Button mode="contained" loading={isLoading} onPress={handleSignIn} style={{ marginTop: 24 }}>
        Entrar
      </Button>
    </View>
  );
}
