import { ProviderProps, MD3DarkTheme, createDynamicThemeColors } from 'react-native-paper';

// ----------------------------------------------------------------------

type ThemeProps = ProviderProps['theme'];

const { darkScheme } = createDynamicThemeColors({ sourceColor: '#00BEB7' });

// ----------------------------------------------------------------------

const theme: ThemeProps = {
  ...MD3DarkTheme,
  colors: darkScheme,
};

export default theme;
