import { Side, Table } from '../hooks/types';
import { createTableObject } from '../hooks/useTables';
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

export const POSSIBLE_SIDE_GROUPS: Side[][] = [
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

export const generateRandomTables = (amount: number) => {
  const tables: Table[] = [];

  for (let i = 0; i < amount; i++) {
    const seatCount = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };

    const sides = randomSides();
    const random = 2 + Math.floor(Math.random() * 3);

    const tableName = `Table ${i}`;

    for (const side of sides) {
      seatCount[side] = random;
    }

    const table = createTableObject({
      tableName,
      seatCount,
    });

    tables.push(table);
  }

  return tables;
};
