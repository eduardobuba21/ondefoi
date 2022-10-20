import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
// screens
import { SignIn } from '@src/screens/auth/sign-in/SignIn';
import { SignUp } from '@src/screens/auth/sign-up/SignUp';

// ----------------------------------------------------------------------

type RootParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type SignInScreenProps = NativeStackScreenProps<RootParamList, 'SignIn'>;
export type SignUpScreenProps = NativeStackScreenProps<RootParamList, 'SignUp'>;

// ----------------------------------------------------------------------

export function AuthRoutes() {
  const Stack = createNativeStackNavigator<RootParamList>();

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
