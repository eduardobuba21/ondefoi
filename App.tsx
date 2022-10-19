import { StatusBar } from 'expo-status-bar';

import { ThemeProvider } from 'styled-components';
import theme from './src/theme';

import { Routes } from './src/routes/Routes';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      <Routes />
    </ThemeProvider>
  );
}
