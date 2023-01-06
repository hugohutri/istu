import styled from 'styled-components';
import { Guest } from '../../../../hooks/useGuests';

type GuestInfoProps = {
  guest: Guest;
};

const StyledFriendName = styled.div`
  color: #fff;
  cursor: pointer;
  padding: 0.2rem 0rem;
  font-size: 0.9rem;
`;

export const GuestInfo = ({ guest }: GuestInfoProps) => {
  const friends = guest.friendNames;
  return (
    <>
      <StyledFriendName>Avec: {guest.avecName ?? '-'}</StyledFriendName>
      <StyledFriendName>
        Friends:{friends.length == 0 && ' -'}
        {friends.map((friend, index) => (
          <div key={index}>-{friend}</div>
        ))}
      </StyledFriendName>
    </>
  );
};
