import {
  Table,
  Seats,
  createTable,
  Side,
} from '../pages/editor/hooks/useTables';
import { v4 as uuidv4 } from 'uuid';

const POSSIBLE_SIDE_GROUPS: Side[][] = [
  ['top', 'right', 'bottom', 'left'],
  ['top', 'bottom'],
  ['top', 'bottom'],
  ['top', 'bottom'],
  ['right', 'left'],
  ['right', 'left'],
  ['right', 'left'],
];

const randomSides = (): Side[] => {
  const random = Math.floor(Math.random() * POSSIBLE_SIDE_GROUPS.length);
  return POSSIBLE_SIDE_GROUPS[random];
};

export const generateRandomTables = () => {
  const tables: Table[] = [];

  for (let i = 0; i < 10; i++) {
    const seats: Seats = {
      top: [],
      right: [],
      bottom: [],
      left: [],
    };

    const sides = randomSides();
    const random = 2 + Math.floor(Math.random() * 3);

    for (const side of sides) {
      for (let j = 0; j < random; j++) {
        seats[side].push({
          id: uuidv4(),
          tableId: '',
          side,
        });
      }
    }

    tables.push(createTable(seats));
  }

  return tables;
};
