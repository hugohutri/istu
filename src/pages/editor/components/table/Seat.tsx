import { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import { PaperSvg } from '../../../../components/PaperSvg';
import { Seat as SeatType, Side } from '../../../../hooks/types';
import { SEAT_SIZE } from '../config';
import { useDraggablePerson } from '../DraggablePerson';

export const Seat = ({ seat }: { seat: SeatType }) => {
  // const [selected, setSelected] = useState(false);
  const isDraggingPerson = useDraggablePerson((s) => s.isDragging);
  const [isHovering, setIsHovering] = useState(false);

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    // setSelected((s) => !s);
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
      <PaperSvg
        opacity={0.3}
        width={SEAT_SIZE}
        height={SEAT_SIZE}
        color={isHovering && isDraggingPerson ? 'blue' : 'white'}
      />
    </StyledSeat>
  );
};

export const StyledSeat = styled.div<{
  side: Side;
}>`
  cursor: pointer;
  width: ${SEAT_SIZE}px;
  height: ${SEAT_SIZE}px;
  align-self: ${({ side }) => alignSide(side)};

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
