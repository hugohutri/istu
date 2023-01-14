import styled from 'styled-components';
import { Highlight } from './sidebar/HighLight';

const ColorboxContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 10rem;
  height: 10.5rem;
  background-color: rgba(205, 206, 205, 0.5);
  border: 1px solid #000000;
`;
const Colorbox = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  border: 1px solid #000000;
  background-color: ${(props) => props.color};
`;

const InfoContainer = styled.div`
  display: flex;
  margin-left: 0.1rem;
  margin-bottom: 0.5rem;
`;

const BoxText = styled.p`
  margin: 0;
  padding-left: 0.5rem;
`;

export const ColorInfo = () => {
  return (
    <ColorboxContainer>
      <h3>Color Info</h3>
      <InfoContainer>
        <Colorbox color={Highlight.HAS_GUEST.color} />
        <BoxText>Seat taken</BoxText>
      </InfoContainer>
      <InfoContainer>
        <Colorbox color={Highlight.SELF.color} />
        <BoxText>Current guest</BoxText>
      </InfoContainer>
      <InfoContainer>
        <Colorbox color={Highlight.COMPANION.color} />
        <BoxText>Companion</BoxText>
      </InfoContainer>
      <InfoContainer>
        <Colorbox color={Highlight.FRIENDS.color} />
        <BoxText>Friends</BoxText>
      </InfoContainer>
    </ColorboxContainer>
  );
};
