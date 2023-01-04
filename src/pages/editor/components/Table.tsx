import Draggable from 'react-draggable';
import styled from 'styled-components';

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

export const Table = ({ size, seats }: TableProps) => {
  return (
    <Draggable>
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
  aspect-ratio: 1/2;
  border: 5px solid black;
  box-sizing: border-box;
  position: relative;
  background-color: lightgray;
`;

const SeatsRow = styled.div<{ side: 'top' | 'right' | 'bottom' | 'left' }>`
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
        left: -32px;
      `;
    }
    if (props.side === 'top') {
      return `
        top: -32px;
        left: 0;
      `;
    }
    if (props.side === 'right') {
      return `
        top: 0;
        right: -32px;
      `;
    }
    if (props.side === 'bottom') {
      return `
        bottom: -32px;
        left: 0;
      `;
    }
  }}
`;

const Seat = styled.div<{
  side: 'top' | 'right' | 'bottom' | 'left';
}>`
  width: 25px;
  height: 25px;

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
