import { DefaultTheme } from 'styled-components';

// export const theme: DefaultTheme = {
//   color: {
//     bg: 'hsl(0,0%,96%)',
//     card: 'hsl(0, 0%, 92%)',
//     muted: 'hsl(0, 0%, 80%)',
//     text: '#FFFFFF',
//     textInverted: '#000000',
//     contrast: 'hsl(200, 50%, 20%)',
//     primary: 'hsl(200, 50%, 30%)',
//     secondary: 'hsl(200, 50%, 40%)',
//     tertiary: 'hsl(200, 50%, 50%)',
//     border: 'hsl(0, 0%, 50%)',
//     pencil: '#41403e',
//   },
//   border: {
//     width: 1,
//     radius: 4,
//   },
// };

export const theme: DefaultTheme = {
  color: {
    // Brand colors
    primary: 'hsl(200, 50%, 40%)',
    primaryElevated: 'hsl(200, 50%, 50%)',
    primaryHighlighted: 'hsl(200, 50%, 30%)',
    primaryText: 'hsl(200, 70%, 40%)',
    primaryMuted: 'hsl(200, 50%, 80%)',
    onPrimary: '#ffffff',
    nav: 'hsl(200, 50%, 20%)',

    // same as above but as hsl
    info: 'hsl(210, 100%, 50%)',
    infoText: 'hsl(210, 100%, 30%)',
    infoMuted: 'hsl(210, 100%, 90%)',

    success: 'hsl(160, 100%, 40%)',
    successText: 'hsl(160, 100%, 20%)',
    successMuted: 'hsl(150, 100%, 80%)',

    warn: 'hsl(50, 100%, 50%)',
    warnText: 'hsl(50, 100%, 30%)',
    warnMuted: 'hsl(50, 100%, 90%)',

    error: 'hsl(0, 100%, 50%)',
    errorText: 'hsl(0, 100%, 30%)',
    errorMuted: 'hsl(0, 100%, 90%)',

    text: 'hsl(210, 5%, 15%)',
    textMuted: 'hsl(210, 5%, 35%)',
    pencil: '#41403e',
    border: 'hsl(0, 0%, 50%)',
    backdrop: 'rgba(0,0,0,0.5)',
    foreground: '#FFFFFF',
    elevated: '#FFFFFF',
    background: '#F3F4F6',

    // Muted gray colors
    muted1: 'hsl(210, 5%, 55%)',
    muted2: 'hsl(210, 5%, 65%)',
    muted3: 'hsl(210, 5%, 75%)',
    muted4: 'hsl(210, 5%, 85%)',
    muted5: 'hsl(210, 5%, 95%)',
  },
  border: {
    width: '1px',
    radius: '4px',
  },
};
