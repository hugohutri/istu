import { Table, Seats, createTable, Side } from '../hooks/useTables';
import { v4 as uuidv4 } from 'uuid';
import { CANVAS_CONFIG } from '../pages/editor/components/config';

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
