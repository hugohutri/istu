import { SEAT_SIZE } from '../pages/editor/components/config';
import { Seat, Table } from './types';
import { getSeats, useTables } from './useTables';

export type SeatWithLocation = Seat & {
  x: number;
  y: number;
};

export const useGetSeatsWithLocation = () => {
  const tables = useTables((s) => s.tables);

  return () => getSeatsWithLocation(tables);
};

function getSeatsWithLocation(tables: Table[]): SeatWithLocation[] {
  const seats = getSeats(tables);
  const seatsWithLocation = seats.map((seat) => {
    let { x, y } = getSeatLocation(seat);

    // offset the seat location to the center of the seat
    x = x + SEAT_SIZE / 2;
    y = y + SEAT_SIZE / 2;

    // Move the seat towards the center of the table
    if (seat.side === 'left') {
      x = x + SEAT_SIZE;
    } else if (seat.side === 'right') {
      x = x - SEAT_SIZE;
    } else if (seat.side === 'top') {
      y = y + SEAT_SIZE;
    } else if (seat.side === 'bottom') {
      y = y - SEAT_SIZE;
    }

    return {
      ...seat,
      x,
      y,
    };
  });
  return seatsWithLocation;
}

function getSeatLocation(seat: Seat) {
  const element = document.getElementById(seat.id);

  if (!element) {
    throw new Error('Could not find seat element');
  }

  const { x, y } = element.getBoundingClientRect();

  return { x, y };
}
