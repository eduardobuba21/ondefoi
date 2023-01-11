// routes
import { SignUpScreenProps } from '@src/routes/auth.routes';
// components
import { Logo } from '@src/components/Logo';
import { Text, Button } from '@src/components/default';
import { Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native';
// sections
import { SignUpForm } from './SignUpForm';

// ----------------------------------------------------------------------

type Props = {
  navigation: SignUpScreenProps['navigation'];
};

// ----------------------------------------------------------------------

export function SignUp({ navigation }: Props) {
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
          Crie sua conta
        </Text>

        <SignUpForm />

        <Button
          variant="text"
          onPress={() => navigation.navigate('SignIn')}
          style={{ marginTop: 24 }}
        >
          Já tem uma conta?
        </Button>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
