import { NavigationContainer, Theme } from '@react-navigation/native';
// hooks
import { useAuth } from '@src/hooks/useAuth';
// theme
import theme from '@src/theme';
// routes
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

// ----------------------------------------------------------------------

export function Routes() {
  const { isLogged } = useAuth();

  return (
    <NavigationContainer theme={theme as unknown as Theme}>
      {isLogged ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
