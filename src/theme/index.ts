import { MD3DarkTheme, createDynamicThemeColors } from 'react-native-paper';

// ----------------------------------------------------------------------

type CustomPalleteColor = {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
};

type CustomPallete = {
  primary: CustomPalleteColor;
  info: CustomPalleteColor;
  success: CustomPalleteColor;
  warning: CustomPalleteColor;
  error: CustomPalleteColor;
};

//

type MD3ThemeProps = typeof MD3DarkTheme;

export type ThemeProps = MD3ThemeProps & {
  palette: CustomPallete;
};

const { darkScheme } = createDynamicThemeColors({ sourceColor: '#00BEB7' });

// ----------------------------------------------------------------------

const palette = {
  primary: {
    lighter: '#C9FBE8',
    light: '#5EEBCD',
    main: '#00BEB7',
    dark: '#007588',
    darker: '#003E5B',
  },
  info: {
    lighter: '#D0F2FF',
    light: '#74CAFF',
    main: '#1890FF',
    dark: '#0C53B7',
    darker: '#04297A',
  },
  success: {
    lighter: '#E9FCD4',
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    darker: '#08660D',
  },
  warning: {
    lighter: '#FFF7CD',
    light: '#FFE16A',
    main: '#FFC107',
    dark: '#B78103',
    darker: '#7A4F01',
  },
  error: {
    lighter: '#FFE7D9',
    light: '#FFA48D',
    main: '#FF4842',
    dark: '#B72136',
    darker: '#7A0C2E',
  },
};

// ----------------------------------------------------------------------

const theme: ThemeProps = {
  ...MD3DarkTheme,
  colors: darkScheme,
  palette: palette,
};

export default theme;
