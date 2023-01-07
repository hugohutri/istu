import { useRef, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import { useHover } from 'usehooks-ts';
import { Guest } from '../../../../hooks/types';
import { GuestInfo } from './GuestInfo';
import { PlaceForDraggablePerson } from './PlaceForDraggablePerson';

type GuestItemProps = {
  guest: Guest;
};

const Row = styled.div`
  padding: 0.2rem 0.5rem;
  display: block;
  position: relative;
  margin: 0;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 0.5rem;
`;

const Name = styled.div`
  flex-grow: 1;
  line-height: 34px;
  font-weight: 300;
  letter-spacing: 1px;
`;

export const GuestItem = ({ guest }: GuestItemProps) => {
  const [open, setOpen] = useState(false);
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(hoverRef);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Row ref={hoverRef} id={guest.name} onClick={handleOpen}>
        <PlaceForDraggablePerson isHover={isHover} guest={guest} />
        <Name>{guest.name}</Name>
        <AnimatedChevron open={open} size={'0.8rem'} />
      </Row>

      <GuestInfo guest={guest} open={open} />
    </>
  );
};

const AnimatedChevron = styled(FaChevronRight)<{ open: boolean }>`
  transition: transform 0.2s ease-in-out;
  transform: ${({ open }) => (open ? 'rotate(90deg)' : 'rotate(0deg)')};
`;
