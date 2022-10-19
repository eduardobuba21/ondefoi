import { StatusBar } from 'expo-status-bar';
// theme
import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';
import { Provider as PaperProvider } from 'react-native-paper';
// routes
import { Routes } from './src/routes';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <PaperProvider>
        <StatusBar style="auto" />
        <Routes />
      </PaperProvider>
    </ThemeProvider>
  );
}
