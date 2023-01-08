import { Table } from './types';
import { useTables } from './useTables';

export const useGetHoveredSeat = () => {
  const tables = useTables((state) => state.tables);

  return () => {
    const hoveredSeatId = getCurrentlyHoveredSeat();
    if (!hoveredSeatId) return;
    return findSeat(tables, hoveredSeatId);
  };
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

function getCurrentlyHoveredSeat() {
  const seat = document.querySelector('.seat:hover');
  if (!seat) return;
  const seatId = seat.getAttribute('id');
  console.log('seatId: ', seatId);
  return seatId ?? undefined;
}
