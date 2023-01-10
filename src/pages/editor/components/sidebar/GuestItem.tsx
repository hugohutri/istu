import { useEffect, useRef, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { FaCheck, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import { useHover } from 'usehooks-ts';
import { Guest } from '../../../../hooks/types';
import { useGuests } from '../../../../hooks/useGuests';
import { GuestInfo } from './GuestInfo';
import { JessePlaceholder } from './JessePlaceholder';
import { useHighlightSeatOnHover } from './useHighlightSeatOnHover';

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
  gap: 0.2rem;
  background-color: ${(props) =>
    props.status === 'Not Seated' && props.theme.color.primaryHighlighted};
`;

const Name = styled.div`
  line-height: 34px;
  font-weight: 300;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FlexGrow = styled.div`
  flex-grow: 1;
`;

export const GuestItem = ({ guest }: GuestItemProps) => {
  const [open, setOpen] = useState(false);
  const hoverRef = useRef<HTMLDivElement>(null);
  const removeGuest = useGuests((s) => s.removeGuest);
  const isHover = useHover(hoverRef);
  const [deleting, setDeleting] = useState(false);
  useHighlightSeatOnHover(isHover, guest);

  const handleOpen = () => {
    setOpen(!open);
  };

  const onPressDelete = () => {
    setDeleting(true);
  };

  useEffect(() => {
    if (!deleting) return;
    const timeout = setTimeout(() => {
      removeGuest(guest);
      setDeleting(false);
    }, 150);

    return () => clearTimeout(timeout);
  }, [deleting]);

  const status = guest.seat ? 'Seated' : 'Not Seated';

  return (
    <AnimateHeight height={deleting ? 0 : 'auto'} duration={150}>
      <div ref={hoverRef}>
        <Row status={status} onClick={handleOpen}>
          <JessePlaceholder isHover={isHover} guest={guest} />
          <Name>{`${guest.name}`}</Name>
          <Status guest={guest} />
          <FlexGrow />
          <AnimatedChevron open={open} size={'0.8rem'} />
        </Row>

        <GuestInfo guest={guest} open={open} onDelete={onPressDelete} />
      </div>
    </AnimateHeight>
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
