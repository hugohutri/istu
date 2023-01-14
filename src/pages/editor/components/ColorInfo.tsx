import styled from 'styled-components';
import { Body } from '../../../components/uikit/Body';
import { Highlight } from './sidebar/HighLight';

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

const ColorRow = styled.div<{ color: string }>`
  ::before {
    content: '';
    width: 20px;
    aspect-ratio: 1/1;
    display: inline-block;
    border: 1px solid #000000;
    background-color: ${(props) => props.color};
    margin-right: 0.5rem;
  }
`;

export const ColorInfo = () => {
  return (
    <ColorboxContainer>
      <Body variant="bold">Color Info</Body>
      <ColorRow color={Highlight.HAS_GUEST.color}>Seat taken</ColorRow>
      <ColorRow color={Highlight.SELF.color}>Current guest</ColorRow>
      <ColorRow color={Highlight.COMPANION.color}>Companion</ColorRow>
      <ColorRow color={Highlight.FRIENDS.color}>Friends</ColorRow>
    </ColorboxContainer>
  );
};
