import { useEffect, useRef, useState } from 'react';
import { FaCheck, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import { useHover } from 'usehooks-ts';
import { Guest } from '../../../../hooks/types';
import { useHighlightedSeats } from '../../../../hooks/useSeatHighlight';
import { GuestInfo } from './GuestInfo';
import { JessePlaceholder } from './JessePlaceholder';

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
  const setHighlightedSeats = useHighlightedSeats((s) => s.setHighlightedSeats);

  useEffect(() => {
    if (!guest.seat) return;
    if (!isHover) {
      setHighlightedSeats([], { color: 'red' });
      return;
    }
    const timeout = setTimeout(() => {
      if (!guest.seat) return;
      setHighlightedSeats([guest.seat], { color: 'red' });
    }, 2);
    return () => clearTimeout(timeout);
  }, [isHover]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const status = guest.seat ? 'Seated' : 'Not Seated';

  return (
    <div ref={hoverRef}>
      <Row status={status} onClick={handleOpen}>
        <JessePlaceholder isHover={isHover} guest={guest} />
        <Name>{`${guest.name}`}</Name>
        <Status guest={guest} />
        <FlexGrow />
        <AnimatedChevron open={open} size={'0.8rem'} />
      </Row>

      <GuestInfo guest={guest} open={open} />
    </div>
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
