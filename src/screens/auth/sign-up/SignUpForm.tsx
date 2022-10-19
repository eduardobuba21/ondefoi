import React, { useState } from 'react';
// components
import { View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

// ----------------------------------------------------------------------

export function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isPwdHidden, setIsPwdHidden] = useState(false);

  function handleNewAccount() {
    setIsLoading(true);
  }

  return (
    <View>
      <Text variant="titleLarge" style={{ marginBottom: 24 }}>
        Crie sua conta
      </Text>

      <TextInput label="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 12 }} />
      <TextInput
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
        style={{ marginBottom: 12 }}
      />

      <Button mode="contained" loading={isLoading} onPress={handleNewAccount}>
        Registrar
      </Button>
    </View>
  );
}
