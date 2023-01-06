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

export const Table = ({ size, seats }: TableType) => {
  return (
    <Draggable
      defaultPosition={getRandomPositionOnCanvas()}
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
