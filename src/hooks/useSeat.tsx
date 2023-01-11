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
  const seatId = seat.id;
  return seatId ?? getSeatUnderJesse() ?? undefined;
}

// Backup function for mobile
function getSeatUnderJesse() {
  const [jesseIcon] = document.getElementsByClassName('jesse-icon');
  const rect = jesseIcon.getBoundingClientRect();
  const center = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
  const elements = document.elementsFromPoint(center.x, center.y);
  for (const el of elements) {
    if (el.classList.contains('seat')) {
      return el.id;
    }
  }
  return null;
}
