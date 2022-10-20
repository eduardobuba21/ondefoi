// routes
import { SignInScreenProps } from '@src/routes/auth.routes';
// components
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text, Button } from 'react-native-paper';
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
      <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
        <Text variant="titleLarge" style={{ marginBottom: 24, textAlign: 'center' }}>
          Acesse sua conta
        </Text>

        <SignInForm />

        <Button mode="text" onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 24 }}>
          Não tem uma conta?
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}
