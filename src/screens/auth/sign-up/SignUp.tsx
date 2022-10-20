// routes
import { SignUpScreenProps } from '@src/routes/auth.routes';
// components
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
// sections
import { SignUpForm } from './SignUpForm';

// ----------------------------------------------------------------------

type Props = {
  navigation: SignUpScreenProps['navigation'];
};

// ----------------------------------------------------------------------

export function SignUp({ navigation }: Props) {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text variant="titleLarge" style={{ marginBottom: 24, textAlign: 'center' }}>
        Crie sua conta
      </Text>

      <SignUpForm />

      <Button mode="text" onPress={() => navigation.navigate('SignIn')} style={{ marginTop: 24 }}>
        Já tem uma conta?
      </Button>
    </View>
  );
}
