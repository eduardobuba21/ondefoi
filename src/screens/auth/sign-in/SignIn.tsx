// routes
import { SignInScreenProps } from '@src/routes/auth.routes';
// components
import { Logo } from '@src/components/Logo';
import { Text, Button } from '@src/components/default';
import { Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native';
// sections
import { SignInForm } from './SignInForm';

// ----------------------------------------------------------------------

type Props = {
  navigation: SignInScreenProps['navigation'];
};

// ----------------------------------------------------------------------

export function SignIn({ navigation }: Props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={{ flex: 1, padding: 24 }}
        contentContainerStyle={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Logo style={{ marginBottom: 100 }} />

        <Text variant="h1" style={{ marginBottom: 24, textAlign: 'center' }}>
          Acesse sua conta
        </Text>

        <SignInForm />

        <Button
          variant="text"
          onPress={() => navigation.navigate('SignUp')}
          style={{ marginTop: 24 }}
        >
          Não tem uma conta?
        </Button>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
