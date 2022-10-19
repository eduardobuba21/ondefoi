import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
// screens
import { SignIn } from '../screens/auth/sign-in/SignIn';
import { SignUp } from '../screens/auth/sign-up/SignUp';

// ----------------------------------------------------------------------

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

// ----------------------------------------------------------------------

export function AuthRoutes() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
