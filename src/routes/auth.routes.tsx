import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
// hooks
import { useTheme } from '@src/hooks/useTheme';
// components
import { Animated } from 'react-native';
import { addTransition } from '@src/components/animations/ScreenTransition';
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
          // animationEnabled: false,
          cardStyleInterpolator: ({ current, next }) => {
            const progress = Animated.add(current.progress, next ? next.progress : 0);

            return {
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [0, 1, 0],
                }),
              },
            };
          },
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 250,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 250,
              },
            },
          },
        }}
      >
        <Stack.Screen name="SignIn" component={addTransition(SignIn)} />
        <Stack.Screen name="SignUp" component={addTransition(SignUp)} />
      </Stack.Navigator>
    </>
  );
}
