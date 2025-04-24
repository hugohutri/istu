import styled from 'styled-components';
import { Body } from '../../../components/uikit/Body';
import { Guest } from '../../../hooks/types';
import { useGuests, useUniqueInitials } from '../../../hooks/useGuests';
import { InfoContainer } from './InfoContainer';

export const UserListInfo = () => {
  const guests = useGuests((s) => s.guests);

  return (
    <InfoContainer>
      <Body variant="bold">Guests</Body>
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}
      >
        {guests.map((guest) => (
          <GuestName key={guest.name} guest={guest} />
        ))}
      </div>
    </InfoContainer>
  );
};

const GuestName = ({ guest }: { guest: Guest }) => {
  const initials = useUniqueInitials(guest);
  return (
    <StyledName>
      {guest.name} ({initials})
    </StyledName>
  );
};

const StyledName = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
`;
