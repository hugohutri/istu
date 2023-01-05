import Draggable from 'react-draggable';
import styled from 'styled-components';
import { Side, Table as TableType, Seat, TableSize } from '../hooks/useTables';

const SEAT_SIZE = 40;
const SEAT_MARGIN = 10;

const getStartingPosition = () => {
  return {
    x: Math.floor(Math.random() * 800),
    y: Math.floor(Math.random() * 800),
  };
};

export const Table = ({ size, seats }: TableType) => {
  return (
    <Draggable
      defaultPosition={getStartingPosition()}
      bounds="parent"
      defaultClassNameDragging="dragging"
    >
      <StyledTable size={size} className="ignore-drag-scroll">
        {Object.entries(seats).map(([side, seats]) => (
          <SeatsRow key={side} side={side as Side} seats={seats} />
        ))}
      </StyledTable>
    </Draggable>
  );
};

const SeatsRow = ({ side, seats }: { side: Side; seats: Seat[] }) => {
  if (seats.length === 0) return null;

  return (
    <StyledSeatsRow side={side}>
      {seats.map((seat) => (
        <StyledSeat key={seat.id} side={side} />
      ))}
    </StyledSeatsRow>
  );
};

// abbr is a hack to make the table draggable
const StyledTable = styled.abbr<{ size: TableSize }>`
  width: ${(props) => props.size.width ?? 100}px;
  height: ${(props) => props.size.height ?? 100}px;
  border: 1px solid ${(props) => props.theme.color.border};
  box-sizing: border-box;
  position: absolute;

  border: solid 2px #41403e;

  box-shadow: 10px 18px 34px -10px hsla(0, 0%, 0%, 0.2);

  transition: box-shadow 0.2s ease-in-out;

  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  &:hover {
    box-shadow: 2px 8px 4px -6px hsla(0, 0%, 0%, 0.3);
  }
`;

const StyledSeatsRow = styled.div<{ side: Side }>`
  display: flex;
  flex-direction: ${(props) =>
    props.side === 'left' || props.side === 'right' ? 'column' : 'row'};

  justify-content: space-around;

  width: 100%;
  height: 100%;

  position: absolute;

  /* outline: 1px solid red; */

  ${(props) => {
    if (props.side === 'left') {
      return `
        top: 0;
        left: -${SEAT_SIZE + SEAT_MARGIN}px;
      `;
    }
    if (props.side === 'top') {
      return `
        top: -${SEAT_SIZE + SEAT_MARGIN}px;
        left: 0;
      `;
    }
    if (props.side === 'right') {
      return `
        top: 0;
        right: -${SEAT_SIZE + SEAT_MARGIN}px;
      `;
    }
    if (props.side === 'bottom') {
      return `
        bottom: -${SEAT_SIZE + SEAT_MARGIN}px;
        left: 0;
      `;
    }
  }}
`;

const StyledSeat = styled.div<{
  side: Side;
}>`
  width: ${SEAT_SIZE}px;
  height: ${SEAT_SIZE}px;

  ${(props) => {
    if (props.side === 'left' || props.side === 'top') {
      return `
        align-self: start;
      `;
    } else {
      return `
        align-self: end;
      `;
    }
  }}

  border: dashed 2px #41403e;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;

  box-shadow: 00px 0px 34px -10px hsla(0, 0%, 0%, 0.2);
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 2px 8px 4px -6px hsla(0, 0%, 0%, 0.3);
    transform: scale(1.1);
  }
  /* background */
  /* background-color: black; */
  /* background-color: ${(props) => props.theme.color.secondary};
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.color.border}; */
`;
