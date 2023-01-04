// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    border: {
      width: number;
      radius: number | string;
    };
    color: {
      bg: string;
      card: string;
      muted: string;
      text: string;
      contrast: string;
      primary: string;
      secondary: string;
      tertiary: string;
    };
  }
}
