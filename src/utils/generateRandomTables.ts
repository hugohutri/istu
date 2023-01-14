import { Table, TableSeatCount } from '../hooks/types';
import { createTableObject } from '../hooks/useTables';
import { CANVAS_CONFIG } from '../pages/editor/components/config';
import { range } from './helpers';

const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomPositionOnCanvas = () => {
  const { width, height } = CANVAS_CONFIG;
  return {
    x: Math.floor(random(width * 0.3, width * 0.7)),
    y: Math.floor(random(height * 0.3, height * 0.7)),
  };
};

const RANDOM_SEAT_COUNTS: TableSeatCount[] = [
  { top: 2, right: 0, bottom: 2, left: 0 },
  { top: 3, right: 0, bottom: 3, left: 0 },
  { top: 4, right: 0, bottom: 4, left: 0 },
  { top: 5, right: 0, bottom: 5, left: 0 },
  { top: 2, right: 0, bottom: 2, left: 0 },
  { top: 3, right: 0, bottom: 3, left: 0 },
  { top: 4, right: 0, bottom: 4, left: 0 },
  { top: 5, right: 0, bottom: 5, left: 0 },

  { top: 0, right: 2, bottom: 0, left: 2 },
  { top: 0, right: 3, bottom: 0, left: 3 },
  { top: 0, right: 4, bottom: 0, left: 4 },
  { top: 0, right: 5, bottom: 0, left: 5 },
  { top: 0, right: 2, bottom: 0, left: 2 },
  { top: 0, right: 3, bottom: 0, left: 3 },
  { top: 0, right: 4, bottom: 0, left: 4 },
  { top: 0, right: 5, bottom: 0, left: 5 },

  { top: 2, right: 2, bottom: 2, left: 2 },
  { top: 1, right: 2, bottom: 1, left: 2 },
  { top: 1, right: 2, bottom: 1, left: 2 },
  { top: 2, right: 1, bottom: 2, left: 1 },
  { top: 1, right: 1, bottom: 1, left: 1 },
];

const randomSeatCount = (): TableSeatCount => {
  const random = Math.floor(Math.random() * RANDOM_SEAT_COUNTS.length);
  return RANDOM_SEAT_COUNTS[random];
};

// const randomSides = (): Side[] => {
//   const random = Math.floor(Math.random() * POSSIBLE_SIDE_GROUPS.length);
//   return POSSIBLE_SIDE_GROUPS[random];
// };

export const generateRandomTables = (amount: number) => {
  const tables: Table[] = [];

  for (const i of range(0, amount)) {
    const table = createTableObject({
      tableName: `Table ${i}`,
      seatCount: randomSeatCount(),
    });

    tables.push(table);
  }

  return tables;
};
