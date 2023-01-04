import styled from 'styled-components';

interface StackProps {
  spacing?: number;
  dir?: 'row' | 'column';
}

export const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: ${(props) => props.dir || 'row'};
  ${(props) =>
    props.spacing &&
    `
        & > * + * {
          margin-${props.dir === 'row' ? 'left' : 'top'}: ${props.spacing}px;
        }
    `}
`;
