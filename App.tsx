import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// theme
import { Provider as ThemeProvider } from 'react-native-paper';
import theme from './src/theme';
// context
import { AuthProvider } from './src/contexts/AuthContext';
// routes
import { Routes } from './src/routes';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style="auto" />

        <AuthProvider>
          <Routes />
        </AuthProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
