import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';

export const Providers = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
