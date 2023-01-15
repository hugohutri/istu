import styled, { css, DefaultTheme } from 'styled-components';

type FontSize = keyof DefaultTheme['fontSize'];

export const Body = styled.div<{ variant?: 'bold'; size?: FontSize }>`
  color: ${(props) => props.theme.color.text};

  ${(props) =>
    props.size &&
    css`
      font-size: ${props.theme.fontSize[props.size]};
    `}

  ${(props) =>
    props.variant === 'bold' &&
    `
    font-weight: 600;
  `}
`;
