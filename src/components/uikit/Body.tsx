import styled from 'styled-components';

export const Body = styled.div<{ variant?: 'bold' }>`
  color: ${(props) => props.theme.color.text};

  ${(props) =>
    props.variant === 'bold' &&
    `
    font-weight: 600;
  `}
`;
