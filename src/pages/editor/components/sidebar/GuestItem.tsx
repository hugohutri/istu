import { useState } from 'react';
import styled from 'styled-components';
import { Guest } from '../../../../hooks/useGuests';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { GuestInfo } from './GuestInfo';

type GuestItemProps = {
  guest: Guest;
};

const StyledName = styled.div`
  line-height: 34px;
  font-weight: 300;
  letter-spacing: 1px;
  display: block;
  margin: 0;
  cursor: pointer;
`;

export const GuestItem = ({ guest }: GuestItemProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <StyledName onClick={handleOpen}>
        {open ? (
          <FaChevronDown size={'0.8rem'} />
        ) : (
          <FaChevronRight size={'0.8rem'} />
        )}

        {guest.name}
      </StyledName>

      {open && <GuestInfo guest={guest} />}
    </>
  );
};
