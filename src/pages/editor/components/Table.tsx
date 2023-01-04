import Draggable from 'react-draggable';
import styled from 'styled-components';

const SEAT_SIZE = 25;
const SEAT_MARGIN = 10;

type TableSeats = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

type Size = {
  width: number;
  height: number;
};

export type TableProps = {
  size: Size;
  seats: TableSeats;
};

type Side = 'top' | 'right' | 'bottom' | 'left';

export const Table = ({ size, seats }: TableProps) => {
  return (
    <Draggable bounds="parent">
      <StyledTable size={size}>
        <SeatsRow side="left">
          {[...Array(seats.left ?? 0)].map((_, index) => (
            <Seat key={index} side="left" />
          ))}
        </SeatsRow>
        <SeatsRow side="top">
          {[...Array(seats.top ?? 0)].map((_, index) => (
            <Seat key={index} side="top" />
          ))}
        </SeatsRow>

        <SeatsRow side="right">
          {[...Array(seats.right ?? 0)].map((_, index) => (
            <Seat key={index} side="right" />
          ))}
        </SeatsRow>
        <SeatsRow side="bottom">
          {[...Array(seats.bottom ?? 0)].map((_, index) => (
            <Seat key={index} side="bottom" />
          ))}
        </SeatsRow>
      </StyledTable>
    </Draggable>
  );
};

const StyledTable = styled.table<{ size: Size }>`
  width: ${(props) => props.size.width ?? 100}px;
  height: ${(props) => props.size.height ?? 100}px;
  border: 1px solid black;
  box-sizing: border-box;
  position: relative;
  background-color: white;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.5);
`;

const SeatsRow = styled.div<{ side: Side }>`
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

const Seat = styled.div<{
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

  background-color: black;
  box-sizing: border-box;
`;
