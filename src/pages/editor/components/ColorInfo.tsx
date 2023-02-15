import styled from 'styled-components';
import { Body } from '../../../components/uikit/Body';
import { InfoContainer } from './InfoContainer';
import { Highlight, HighlightType } from './sidebar/HighLight';

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
    background-color: ${(props) =>
      rgba(props.$highlight.color, props.$highlight.opacity)};
    margin-right: 0.5rem;
  }
`;

export const ColorInfo = () => {
  return (
    <InfoContainer>
      <Body variant="bold">Color Info</Body>
      {Object.values(Highlight).map((highlight, idx) => (
        <ColorRow key={idx} $highlight={highlight} />
      ))}
    </InfoContainer>
  );
};

function rgba(color: string, opacity = 1) {
  return color + Math.round(opacity * 255).toString(16);
}
