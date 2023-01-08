import { useRef, useState } from 'react';
import { FaCheck, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import { useHover } from 'usehooks-ts';
import { Guest } from '../../../../hooks/types';
import { GuestInfo } from './GuestInfo';
import { PlaceForDraggablePerson } from './PlaceForDraggablePerson';

type GuestItemProps = {
  guest: Guest;
};

const Row = styled.div<{ status: string }>`
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
  background-color: ${(props) =>
    props.status === 'Not Seated' && props.theme.color.primaryHighlighted};
`;

const Name = styled.div`
  line-height: 34px;
  font-weight: 300;
  letter-spacing: 1px;
`;

const FlexGrow = styled.div`
  flex-grow: 1;
`;

export const GuestItem = ({ guest }: GuestItemProps) => {
  const [open, setOpen] = useState(false);
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(hoverRef);

  const handleOpen = () => {
    setOpen(!open);
  };

  const status = guest.seat ? 'Seated' : 'Not Seated';

  return (
    <>
      <Row status={status} ref={hoverRef} onClick={handleOpen}>
        <PlaceForDraggablePerson isHover={isHover} guest={guest} />
        <Name>{`${guest.name}`}</Name>
        <Status guest={guest} />
        <FlexGrow />
        <AnimatedChevron open={open} size={'0.8rem'} />
      </Row>

      <GuestInfo guest={guest} open={open} />
    </>
  );
};

const Status = ({ guest }: { guest: Guest }) => {
  if (guest.seat) return <CheckMark size={'0.6rem'} />;
  return null;
};

const CheckMark = styled(FaCheck)`
  color: ${(props) => props.theme.color.success};
`;

const AnimatedChevron = styled(FaChevronRight)<{ open: boolean }>`
  transition: transform 0.2s ease-in-out;
  transform: ${({ open }) => (open ? 'rotate(90deg)' : 'rotate(0deg)')};
`;
