import { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import { PaperSvg } from '../../../../components/PaperSvg';
import { Seat as SeatType, Side } from '../../../../hooks/types';
import { getInitials, useGuests } from '../../../../hooks/useGuests';
import { useHighlightedSeats } from '../../../../hooks/useSeatHighlight';
import { SEAT_SIZE } from '../config';
import { useJesse } from '../Jesse';
import { Highlight } from '../sidebar/HighLight';

export const Seat = ({ seat }: { seat: SeatType }) => {
  const isDraggingPerson = useJesse((s) => s.isDragging);
  // const setPos = useJesse((s) => s.setPos);
  const [isHovering, setIsHovering] = useState(false);
  const highlightedSeats = useHighlightedSeats((s) => s.highlightedSeats);

  const storedHighlight = highlightedSeats.get(seat.id);

  const guests = useGuests((s) => s.guests);
  const guest = guests.find((g) => g.seat?.id === seat.id);

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    // setPos({ x: 0, y: 0 });
    // setSelected((s) => !s);
  };

  const getHighlight = () => {
    if (storedHighlight) return storedHighlight;
    if (guest) return Highlight.HAS_GUEST;
    if (isHovering && isDraggingPerson) return Highlight.HOVER_WITH_JESSE;
    if (isHovering) return Highlight.HOVER;
    return Highlight.NONE;
  };

  const highlight = getHighlight();

  return (
    <StyledSeat
      id={seat.id}
      side={seat.side}
      animateIn={highlight.animateIn}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="seat ignore-drag-scroll"
    >
      <PaperSvg
        opacity={highlight.opacity ?? 1}
        width={SEAT_SIZE}
        height={SEAT_SIZE}
        color={highlight.color}
      />
      {guest && <GuestName>{getInitials(guest, 2)}</GuestName>}
      {guest && isHovering && <Tooltip side={seat.side}>{guest.name}</Tooltip>}
      
    </StyledSeat>
  );
};



const Tooltip = styled.div<{side: Side}>`
  position: absolute;
  //align-self: ${({side}) => side === 'left' ? 'flex-start' : 'flex-end'};

  ${props => props.side}: -3px;
  
  transform: ${({side}) => getSideTransform(side)};
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 4px;
  font-size: 14px;
`;

const getSideTransform = (side: Side) => {
  switch (side) {
    case 'left':
      return 'translateX(-100%)';
    case 'right':
      return 'translateX(100%)';
    case 'top':
      return 'translateY(-100%)';
    case 'bottom':
      return 'translateY(100%)';
  }
};

const GuestName = styled.div`
  /* background-color: rgba(0, 0, 0, 0.2); */
  position: absolute;

  /* font-family: sans-serif; */
  text-align: center;
  /* line-height: 16px; */
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
  animateIn?: boolean;
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

  // Animation
  animation: ${({ animateIn }) => (animateIn ? 'pop 0.5s' : 'none')};
  @keyframes pop {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
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
