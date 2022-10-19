import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { SignIn } from '../screens/auth/sign-in/SignIn';
import { SignUp } from '../screens/auth/sign-up/SignUp';

// ----------------------------------------------------------------------

export function AuthRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Screen name="signIn" component={SignIn} /> */}
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  );
}
