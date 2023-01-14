import create from 'zustand';
import { range } from '../utils/helpers';
import { Seat, Seats, Side, Table, TableSeatCount, TableSize } from './types';

/************************
 * HOOKS
 ************************/

type TablesStore = {
  tables: Table[];
  setTables: (tables: Table[]) => void;
  addTable: (newTable: Table) => void;
};

export const useTables = create<TablesStore>((set) => ({
  tables: [],

  setTables: (tables) => set(() => ({ tables })),

  addTable: (newTable) =>
    set((state) => ({ tables: [...state.tables, newTable] })),
}));

export const getSeats = (tables: Table[]): Seat[] => {
  return tables
    .flatMap(({ seats }) => {
      return [...seats.top, ...seats.bottom, ...seats.left, ...seats.right];
    })
    .flat();
};

/************************
 * HELPER FUCTIONS
 ************************/

const DISTANCE_OF_SEATS = 65;
const TABLE_DEPTH = 100;

export const calculateTableSize = (seats: Seats): TableSize => {
  const maxWidth = Math.max(seats.top.length, seats.bottom.length);
  const maxHeight = Math.max(seats.left.length, seats.right.length);

  const width = maxWidth * DISTANCE_OF_SEATS;
  const height = maxHeight * DISTANCE_OF_SEATS;

  return {
    width: Math.max(width, TABLE_DEPTH),
    height: Math.max(height, TABLE_DEPTH),
  };
};

const SIDES: Side[] = ['top', 'right', 'bottom', 'left'];

export const createTableObject = ({
  seatCount,
  tableName,
}: {
  seatCount: TableSeatCount;
  tableName: string;
}) => {
  const seats: Seats = {
    top: [],
    right: [],
    bottom: [],
    left: [],
  };

  for (const side of SIDES) {
    for (const idx of range(0, seatCount[side])) {
      seats[side].push({
        id: `${tableName} Seat ${side}-${idx}`,
        tableId: tableName,
        side,
      });
    }
  }

  const tableSize = calculateTableSize(seats);
  return {
    id: tableName,
    size: tableSize,
    seats,
  };
};
