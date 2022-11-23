import { NavigationContainer } from '@react-navigation/native';
// hooks
import { useAuth } from '@src/hooks/useAuth';
// theme
import { theme } from '@src/theme';
// routes
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

// ----------------------------------------------------------------------

export function Routes() {
  const { isLogged } = useAuth();

  return (
    <NavigationContainer theme={theme}>
      {isLogged ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
