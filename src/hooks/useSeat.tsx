import { Table } from './types';
import { useTables } from './useTables';

export const useGetSeat = () => {
  const tables = useTables((state) => state.tables);

  return (seatId: string) => findSeat(tables, seatId);
};

const findSeat = (tables: Table[], seatId: string) => {
  for (const table of tables) {
    for (const seat of table.seats.top) {
      if (seat.id === seatId) {
        return seat;
      }
    }
    for (const seat of table.seats.bottom) {
      if (seat.id === seatId) {
        return seat;
      }
    }
    for (const seat of table.seats.left) {
      if (seat.id === seatId) {
        return seat;
      }
    }
    for (const seat of table.seats.right) {
      if (seat.id === seatId) {
        return seat;
      }
    }
  }
};
