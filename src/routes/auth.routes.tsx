import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import {
  StackScreenProps,
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
// hooks
import { useTheme } from '@src/hooks/useTheme';
// screens
import { SignIn } from '@src/screens/auth/sign-in/SignIn';
import { SignUp } from '@src/screens/auth/sign-up/SignUp';

// ----------------------------------------------------------------------

type RootParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type SignInScreenProps = StackScreenProps<RootParamList, 'SignIn'>;
export type SignUpScreenProps = StackScreenProps<RootParamList, 'SignUp'>;

// ----------------------------------------------------------------------

export function AuthRoutes() {
  const theme = useTheme();
  const Stack = createStackNavigator<RootParamList>();

  NavigationBar.setBackgroundColorAsync(theme.palette.background.default);

  return (
    <>
      <StatusBar style="light" backgroundColor={theme.palette.background.default} />

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </>
  );
}
