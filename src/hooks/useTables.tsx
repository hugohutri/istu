import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { generateRandomTables } from '../utils/randomData';

export type Side = 'top' | 'right' | 'bottom' | 'left';

export type Seat = {
  id: string;
  tableId: string;
  side: Side;
};

export type TableSize = {
  /**
   * Width in pixels, but it's cm in real life
   */
  width: number;
  /**
   * Height in pixels, but it's cm in real life
   */
  height: number;
};

export type Seats = {
  top: Seat[];
  right: Seat[];
  bottom: Seat[];
  left: Seat[];
};

export type Table = {
  id: string;
  size: {
    width: number;
    height: number;
  };
  seats: Seats;
};

/************************
 * HELPER FUCTIONS
 ************************/

export const createTable = (seats: Seats): Table => {
  const tableSize = calculateTableSize(seats);
  return {
    id: uuidv4(),
    size: tableSize,
    seats,
  };
};

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

/************************
 * HOOKS
 ************************/
type TablesStore = {
  tables: Table[];
  addTable: (newTable: Table) => void;
};

const DEFAULT_TABLES: Table[] = generateRandomTables();

export const useTables = create<TablesStore>((set) => ({
  tables: DEFAULT_TABLES,
  addTable: (newTable) =>
    set((state) => ({ tables: [...state.tables, newTable] })),
}));
