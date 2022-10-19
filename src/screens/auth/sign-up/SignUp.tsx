import { View } from 'react-native';
import { SignUpForm } from './SignUpForm';

// ----------------------------------------------------------------------

export function SignUp() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <SignUpForm />
    </View>
  );
}
