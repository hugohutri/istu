// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string;
      primaryElevated: string;
      primaryHighlighted: string;
      primaryText: string;
      primaryMuted: string;
      onPrimary: string;
      nav: string;

      info: string;
      infoText: string;
      infoMuted: string;

      success: string;
      successText: string;
      successMuted: string;

      warn: string;
      warnText: string;
      warnMuted: string;

      error: string;
      errorText: string;
      errorMuted: string;

      text: string;
      textMuted: string;
      pencil: string;
      border: string;
      backdrop: string;
      foreground: string;
      elevated: string;
      background: string;
      muted1: string;
      muted2: string;
      muted3: string;
      muted4: string;
      muted5: string;
    };
    border: {
      width: string;
      radius: string;
    };
  }
}
