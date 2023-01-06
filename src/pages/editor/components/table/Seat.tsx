import { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import { PaperSvg } from '../../../../components/PaperSvg';
import { Side } from '../../../../hooks/useTables';
import { SEAT_SIZE } from '../config';

export const Seat = ({ side }: { side: Side }) => {
  const [selected, setSelected] = useState(false);

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    setSelected((s) => !s);
  };

  return (
    <StyledSeat
      key={side}
      side={side}
      onClick={handleClick}
      className="ignore-drag-scroll"
    >
      <PaperSvg
        opacity={0.3}
        width={SEAT_SIZE}
        height={SEAT_SIZE}
        color={selected ? 'red' : 'white'}
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
  border: dashed 2px #41403e;
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
