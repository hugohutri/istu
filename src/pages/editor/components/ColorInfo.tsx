import styled from 'styled-components';
import { Body } from '../../../components/uikit/Body';
import { Highlight, HighlightType } from './sidebar/HighLight';

const ColorboxContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  padding: 0.5rem;
  margin: 0.3rem;

  background-color: rgba(255, 255, 255, 0.666);
  outline: 1px solid ${(props) => props.theme.color.border};
  pointer-events: none;
`;

const ColorRow = styled.div<{ $highlight: HighlightType }>`
  ${(props) => !props.$highlight.displayName && `display: none;`}

  ::after {
    content: '${(props) => props.$highlight.displayName}';
  }

  ::before {
    content: '';
    width: 20px;
    aspect-ratio: 1/1;
    display: inline-block;
    border: 1px solid #000000;
    background-color: ${(props) => props.$highlight.color};
    margin-right: 0.5rem;
  }
`;

export const ColorInfo = () => {
  return (
    <ColorboxContainer>
      <Body variant="bold">Color Info</Body>
      {Object.values(Highlight).map((highlight) => (
        <ColorRow key={highlight.displayName} $highlight={highlight} />
      ))}
    </ColorboxContainer>
  );
};