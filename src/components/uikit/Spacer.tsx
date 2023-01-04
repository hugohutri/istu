import styled from 'styled-components';

interface SpacerProps {
  amount: number;
  dir?: 'x' | 'y';
}

export const Spacer = styled.div<SpacerProps>`
  ${(props) =>
    props.dir === 'x'
      ? `width: ${props.amount}px`
      : `height: ${props.amount}px`};
`;
