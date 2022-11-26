import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
// providers
import { PortalProvider } from '@gorhom/portal';
import { AuthProvider } from './src/contexts/AuthContext';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// routes
import { Routes } from './src/routes';

SplashScreen.preventAutoHideAsync();

// ----------------------------------------------------------------------

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <SafeAreaProvider>
          <StatusBar style="light" />

          <AuthProvider>
            <Routes />
          </AuthProvider>
        </SafeAreaProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}
