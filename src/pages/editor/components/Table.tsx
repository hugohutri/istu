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
        {/* <SeatsRow side="left">
          {[...Array(seats.left ?? 0)].map((_, index) => (
            <Seat key={index} />
          ))}
        </SeatsRow> */}
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
        {/* 
        <SeatsRow side="bottom">
          {[...Array(seats.bottom ?? 0)].map((_, index) => (
            <Seat key={index} side="bottom" />
          ))}
        </SeatsRow>

        <SeatsRow side="left">
          {[...Array(seats.left ?? 0)].map((_, index) => (
            <Seat key={index} side="left" />
          ))}
        </SeatsRow> */}

        {/* {seats.top &&
          [...Array(seats.top)].map((_, index) => <Seat key={index} />)} */}
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
  /* display: grid; */
`;

const LeftSeats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;

  outline: 1px solid red;
`;

const SeatsRow = styled.div<{ side: 'top' | 'right' | 'bottom' | 'left' }>`
  display: flex;
  flex-direction: ${(props) =>
    props.side === 'left' || props.side === 'right' ? 'column' : 'row'};

  justify-content: space-around;

  width: 100%;
  height: 100%;

  position: absolute;

  /* display: flex; */

  /* grid-template-columns: ${(props) =>
    props.side === 'left' || props.side === 'right' ? '1fr' : '1fr 1fr'};

  grid-template-rows: ${(props) =>
    props.side === 'left' || props.side === 'right' ? '1fr 1fr' : '1fr'}; */

  outline: 1px solid red;

  /* margin: -30px; */

  /* margin-left: ${(props) => (props.side === 'left' ? '-30px' : '0')};
  margin-top: ${(props) => (props.side === 'top' ? '-30px' : '0')};
  margin-right: ${(props) => (props.side === 'right' ? '-30px' : '0')};
  margin-bottom: ${(props) => (props.side === 'bottom' ? '-30px' : '0')}; */

  /* transform: rotate(90deg); */
`;

const Seat = styled.div<{
  side: 'top' | 'right' | 'bottom' | 'left';
}>`
  width: 20px;
  height: 20px;
  background-color: black;
  /* margin-left: -30px; */
  margin-left: ${(props) => (props.side === 'left' ? '-30px' : '0')};
  margin-top: ${(props) => (props.side === 'top' ? '-30px' : '0')};
  margin-right: ${(props) => (props.side === 'right' ? '-30px' : '0')};
  margin-bottom: ${(props) => (props.side === 'bottom' ? '-30px' : '0')};
`;
