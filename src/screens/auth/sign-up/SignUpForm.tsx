import React, { useState } from 'react';
// components
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
// utils
import firebase from '@src/utils/firebase';

// ----------------------------------------------------------------------

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPwdHidden, setIsPwdHidden] = useState(true);

  function handleSubmit() {
    if (isLoading) return;
    setIsLoading(true);

    firebase.auth.signUp(email, password).catch((error) => {
      setIsLoading(false);
      console.log('[buba] firebase/auth/sign-up - error: ', error.code);
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

      <Button mode="contained" loading={isLoading} onPress={handleSubmit} style={{ marginTop: 24 }}>
        Registrar
      </Button>
    </View>
  );
}
