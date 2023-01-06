import { useState } from 'react';
import styled from 'styled-components';
import { Guest } from '../../../../hooks/useGuests';

type GuestItemProps = {
  guest: Guest;
};

const StyledGuestName = styled.div`
  color: red;
  cursor: pointer;
  padding: 0.3rem;
`;

export const GuestItem = (props: GuestItemProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  //{open ? <div>Friends: {friendList || '-'}</div> : null}
  const friends = props.guest.friendNames;

  return (
    <>
      {open ? (
        <StyledGuestName onClick={handleOpen}>
          {props.guest.name} -
        </StyledGuestName>
      ) : (
        <StyledGuestName onClick={handleOpen}>
          {props.guest.name} +
        </StyledGuestName>
      )}
      {open ? <div>Avec: {props.guest.avecName ?? '-'}</div> : null}
      {open ? (
        <div>
          Friends:{friends.length == 0 && ' -'}
          {friends.map((friend, index) => (
            <div key={index}>-{friend}</div>
          ))}
        </div>
      ) : null}
    </>
  );
};
