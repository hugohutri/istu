import styled from 'styled-components';
import { Guest } from '../../../../hooks/types';

type GuestInfoProps = {
  guest: Guest;
  open: boolean;
};

const StyledFriendName = styled.div`
  color: #fff;
  cursor: pointer;
  font-size: 0.8rem;
`;

export const GuestInfo = ({ guest, open }: GuestInfoProps) => {
  const friends = guest.friendNames;
  return (
    <GuestInfoContainer open={open}>
      <StyledFriendName>Avec: {guest.avecName ?? '-'}</StyledFriendName>
      <StyledFriendName>
        Friends:{friends.length == 0 && ' -'}
        {friends.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </StyledFriendName>
    </GuestInfoContainer>
  );
};

const GuestInfoContainer = styled.div<{ open: boolean }>`
  background-color: ${(props) => props.theme.color.secondary};
  padding: ${({ open }) => (open ? '0.5rem 0' : '0')};
  padding-left: 1rem;

  overflow: hidden;
  max-height: ${(props) => (props.open ? '200px' : '0px')};
  transition: max-height 0.2s ease-in-out, padding 0.2s ease-in-out;
`;
