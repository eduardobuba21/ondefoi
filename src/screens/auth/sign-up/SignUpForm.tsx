import React, { useState } from 'react';
// hooks
import { useAuth } from '@src/hooks/useAuth';
// components
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

// ----------------------------------------------------------------------

export function SignUpForm() {
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isPwdHidden, setIsPwdHidden] = useState(false);

  function handleSignUp() {
    setIsLoading(true);

    signUp(email, password);
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

      <Button mode="contained" loading={isLoading} onPress={handleSignUp} style={{ marginTop: 24 }}>
        Registrar
      </Button>
    </View>
  );
}
