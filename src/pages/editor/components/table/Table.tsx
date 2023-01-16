import Draggable from 'react-draggable'
import styled from 'styled-components'
import {
    Side,
    Table as TableType,
    Seat as SeatType,
    TableSize,
} from '../../../../hooks/types'
import { getRandomPositionOnCanvas } from '../../../../utils/generateRandomTables'
import { Seat } from './Seat'
import { StyledSeatsRow } from './StyledSeatsRow'

import '../../../../utils/dragging.css'
import { TableMenu } from './TableMenu'

export const Table = (table: TableType) => {
    const { size, seats, id } = table
    return (
        <Draggable
            defaultPosition={getRandomPositionOnCanvas()}
            bounds="parent"
            handle=".handle"
            defaultClassNameDragging="dragging"
        >
            <TableContainer size={size}>
                {Object.entries(seats).map(([side, seats]) => (
                    <SeatsRow
                        key={id + side}
                        side={side as Side}
                        seats={seats}
                    />
                ))}
                <StyledTable id={id} className="handle ignore-drag-scroll">
                    <TableMenu table={table} />
                    {id}
                </StyledTable>
            </TableContainer>
        </Draggable>
    )
}

const SeatsRow = ({ side, seats }: { side: Side; seats: SeatType[] }) => {
    if (seats.length === 0) return null

    return (
        <StyledSeatsRow side={side}>
            {seats.map((seat) => (
                <Seat key={seat.id} seat={seat} />
            ))}
        </StyledSeatsRow>
    )
}

// abbr is a hack to make the table draggable
const TableContainer = styled.abbr<{ size: TableSize }>`
    width: ${({ size }) => size.width}px;
    height: ${({ size }) => size.height}px;
    position: absolute;
    :hover {
        z-index: 10;
    }
`

const StyledTable = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    font-family: 'Comfortaa';
    color: ${(props) => props.theme.color.pencil};

    user-select: none;

    width: 100%;
    height: 100%;
    border: 1px solid ${(props) => props.theme.color.border};
    box-sizing: border-box;
    position: relative;

    border: solid 2px ${(props) => props.theme.color.pencil};
    box-shadow: 10px 18px 34px -10px hsla(0, 0%, 0%, 0.2);

    transition: box-shadow 0.2s ease-in-out;

    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    &:hover {
        box-shadow: 2px 8px 4px -6px hsla(0, 0%, 0%, 0.3);
        .table-menu {
            display: flex;
        }
    }
`
