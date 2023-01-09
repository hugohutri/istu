import AnimateHeight from 'react-animate-height';
import styled from 'styled-components';
import { Spacer } from '../../../../components/uikit/Spacer';
import { Guest } from '../../../../hooks/types';
import { useGuests } from '../../../../hooks/useGuests';
import { useHighlightedSeats } from '../../../../hooks/useSeatHighlight';

type GuestInfoProps = {
  guest: Guest;
  open: boolean;
};

const StyledFriendName = styled.div`
  color: ${(props) => props.theme.color.onPrimary};
  cursor: pointer;
  font-size: 0.8rem;
`;

export const GuestInfo = ({ guest, open }: GuestInfoProps) => {
  const friends = guest.friendNames;
  const removeGuest = useGuests((s) => s.removeGuest);

  return (
    <AnimatedContainer
      animateOpacity={true}
      delay={0}
      duration={250}
      height={open ? 'auto' : 0}
    >
      <Spacer amount="0.5rem" />

      <StyledFriendName>Seat: {guest.seat?.id ?? '-'}</StyledFriendName>
      <StyledFriendName>Avec: {guest.avecName ?? '-'}</StyledFriendName>

      <StyledFriendName>
        Friends: {friends.length == 0 && '-'}
        {friends.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </StyledFriendName>
      <button onClick={() => removeGuest(guest)}>Delete guest</button>
      <Spacer amount="0.5rem" />
    </AnimatedContainer>
  );
};

const AnimatedContainer = styled(AnimateHeight)`
  background-color: ${(props) => props.theme.color.primaryElevated};
  padding: 0 0.5rem;
`;

/* display: ${({ open }) => (open ? 'block' : 'none')}; */
/* height: ${({ open }) => (open ? 'auto' : '0')};

  transform: scaleY(0);
  transform: ${({ open }) => (open ? 'scaleY(1)' : 'scaleY(0)')};
  transition: transform 1s ease-in-out;
  transition: all 1s ease-in-out; */
/* height: ${({ open }) => (open ? 'auto' : '0')}; */
/* overflow: hidden; */
/* padding: ${({ open }) => (open ? '0.5rem 0' : '0')}; */
/* overflow: hidden; */
/* max-height: ${(props) => (props.open ? 'auto' : '1px')}; */
/* transition: max-height 0.2s ease-in-out, padding 0.2s ease-in-out; */
