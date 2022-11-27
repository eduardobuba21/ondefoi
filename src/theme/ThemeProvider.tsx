import { ReactNode } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
// theme
import { theme } from '@src/theme';
// components
import { StatusBar } from 'expo-status-bar';

// ----------------------------------------------------------------------

NavigationBar.setBackgroundColorAsync(theme.palette.background.default);

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

// ----------------------------------------------------------------------

export function ThemeProvider({ ...rest }: Props) {
  return (
    <>
      <StatusBar style="light" />
      {rest.children}
    </>
  );
}
