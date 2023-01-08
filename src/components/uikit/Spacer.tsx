import styled from 'styled-components';

interface SpacerProps {
  amount: string;
  dir?: 'x' | 'y';
}

export const Spacer = styled.div<SpacerProps>`
  ${(props) =>
    props.dir === 'x' ? `width: ${props.amount}` : `height: ${props.amount}`};
`;
