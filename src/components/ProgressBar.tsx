import styled from 'styled-components';

export const ProgressBar = styled.div<{ percentage: number }>`
  width: 100%;
  height: 10px;
  background-color: ${(props) => props.theme.color.primaryMuted};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => props.percentage}%;
    height: 100%;
    background-color: ${(props) => props.theme.color.primary};
  }
`;
