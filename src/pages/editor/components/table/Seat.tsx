import { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import { PaperSvg } from '../../../../components/PaperSvg';
import { Seat as SeatType, Side } from '../../../../hooks/types';
import { getInitials, useGuests } from '../../../../hooks/useGuests';
import { SEAT_SIZE } from '../config';
import { useJesse } from '../Jesse';

export const Seat = ({ seat }: { seat: SeatType }) => {
  // const [selected, setSelected] = useState(false);
  const isDraggingPerson = useJesse((s) => s.isDragging);
  const [isHovering, setIsHovering] = useState(false);

  const guests = useGuests((s) => s.guests);
  const guest = guests.find((g) => g.seat?.id === seat.id);

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    // setSelected((s) => !s);
  };

  const getColor = () => {
    if (guest) return 'green';
    if (isHovering && isDraggingPerson) return 'blue';
    if (isHovering) return 'gray';
    return 'white';
  };

  return (
    <StyledSeat
      id={seat.id}
      side={seat.side}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="seat ignore-drag-scroll"
    >
      {guest && <GuestName>{getInitials(guest, 2)}</GuestName>}
      <PaperTexture
        opacity={0.3}
        width={SEAT_SIZE}
        height={SEAT_SIZE}
        color={getColor()}
      />
    </StyledSeat>
  );
};

const PaperTexture = styled(PaperSvg)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const GuestName = styled.div`
  /* background-color: rgba(0, 0, 0, 0.2); */
  position: absolute;

  text-align: center;
  line-height: 16px;
  font-size: 16px;
  overflow: hidden;
  letter-spacing: 2px;
  text-overflow: clip;
  margin: 2px;
  user-select: none;
  font-weight: bold;

  color: ${(props) => props.theme.color.pencil};
`;

export const StyledSeat = styled.div<{
  side: Side;
}>`
  cursor: pointer;
  width: ${SEAT_SIZE}px;
  height: ${SEAT_SIZE}px;
  align-self: ${({ side }) => alignSide(side)};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  // Visual styles
  border: dashed 2px ${(props) => props.theme.color.pencil};
  box-sizing: border-box;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  box-shadow: 0px 10px 14px -6px hsla(0, 0%, 0%, 0.4);
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 2px 8px 4px -6px hsla(0, 0%, 0%, 0.4);
  }
`;

/**
 * Css flexbox align-self property starts from top or left
 * so we need to change the value for the bottom and right sides
 */
const alignSide = (side: Side) => {
  if (side === 'left' || side === 'top') {
    return 'start';
  }
  return 'end';
};
