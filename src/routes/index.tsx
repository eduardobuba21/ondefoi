import { NavigationContainer } from '@react-navigation/native';
//
import { useAuth } from '../hooks/useAuth';
//
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

// ----------------------------------------------------------------------

export function Routes() {
  const { isLogged } = useAuth();

  if (isLogged) {
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>;
  }

  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}
