import { ThemeProps } from '@src/theme';
import { useTheme as useThemePaper } from 'react-native-paper';

// ----------------------------------------------------------------------

export const useTheme = () => useThemePaper<ThemeProps>();
