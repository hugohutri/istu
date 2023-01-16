import styled from 'styled-components';

interface StackProps {
  spacing?: number;
  dir?: 'row' | 'column';
  justify?: 'center' | 'flex-start' | 'flex-end';
}

export const Stack = styled.div<StackProps>`
  display: flex;
  justify-content: ${(props) => props.justify || 'flex-start'};
  flex-direction: ${(props) => props.dir || 'row'};
  ${(props) =>
    props.spacing &&
    `
        & > * + * {
          margin-${props.dir === 'row' ? 'left' : 'top'}: ${props.spacing}px;
        }
    `}
`;
