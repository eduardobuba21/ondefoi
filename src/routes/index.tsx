import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
// hooks
import { useAuth } from '@src/hooks/useAuth';
// theme
import { theme } from '@src/theme';
// components
import { View } from 'react-native';
// routes
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

// ----------------------------------------------------------------------

export function Routes() {
  const { isLoading, isLogged } = useAuth();

  // ----------------------------------------------------------------------

  const onLayoutRootView = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  // ----------------------------------------------------------------------

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer theme={theme}>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        {isLogged ? <AppRoutes /> : <AuthRoutes />}
      </View>
    </NavigationContainer>
  );
}
