import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  color: {
    bg: '#FFFFFF',
    card: '#F5F5F5',
    muted: '#D3D3D3',
    text: '#2A2C25',
    contrast: '#3B413C',
    primary: '#94D1BE',
    secondary: '#9DB5B2',
    tertiary: '#DAF0EE',
  },
  border: {
    width: 1,
    radius: 4,
  },
};

export type Theme = typeof theme;
