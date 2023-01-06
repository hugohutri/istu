import Draggable from 'react-draggable';
import styled from 'styled-components';
import {
  Side,
  Table as TableType,
  Seat as SeatType,
  TableSize,
} from '../../../../hooks/useTables';
import { getRandomPositionOnCanvas } from '../../../../utils/randomData';
import { Seat } from './Seat';
import { StyledSeatsRow } from './StyledSeatsRow';

import '../../../../utils/dragging.css';

export const Table = ({ size, seats, id }: TableType) => {
  return (
    <Draggable
      defaultPosition={getRandomPositionOnCanvas()}
      bounds="parent"
      handle=".handle"
      defaultClassNameDragging="dragging"
    >
      <TableContainer size={size}>
        {Object.entries(seats).map(([side, seats]) => (
          <SeatsRow key={id + side} side={side as Side} seats={seats} />
        ))}
        <StyledTable className="handle ignore-drag-scroll" />
      </TableContainer>
    </Draggable>
  );
};

const SeatsRow = ({ side, seats }: { side: Side; seats: SeatType[] }) => {
  if (seats.length === 0) return null;

  return (
    <StyledSeatsRow side={side}>
      {seats.map((seat) => (
        <Seat key={seat.id} side={side} />
      ))}
    </StyledSeatsRow>
  );
};

// abbr is a hack to make the table draggable
const TableContainer = styled.abbr<{ size: TableSize }>`
  width: ${({ size }) => size.width}px;
  height: ${({ size }) => size.height}px;

  position: absolute;
`;

const StyledTable = styled.div`
  width: 100%;
  height: 100%;
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