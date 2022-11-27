import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// providers
import { PortalProvider } from '@gorhom/portal';
import { ThemeProvider } from '@src/theme/ThemeProvider';
import { AuthProvider } from '@src/contexts/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// routes
import { Routes } from '@src/routes';

// ----------------------------------------------------------------------

SplashScreen.preventAutoHideAsync();

// ----------------------------------------------------------------------

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <SafeAreaProvider>
          <ThemeProvider>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}
