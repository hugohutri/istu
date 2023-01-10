import { Seat, Table } from './types';
import { getSeats, useTables } from './useTables';

type SeatWithLocation = Seat & {
  x: number;
  y: number;
};

export const useGetSeatsWithCoordinates = () => {
  const tables = useTables((s) => s.tables);

  return () => getSeatsWithLocation(tables);
};

function getSeatsWithLocation(tables: Table[]): SeatWithLocation[] {
  const seats = getSeats(tables);
  console.log('seats', seats.length);
  const seatsWithLocation = seats.map((seat) => {
    const { x, y } = getSeatLocation(seat);
    return {
      ...seat,
      x,
      y,
    };
  });
  console.log(seatsWithLocation.length);
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
