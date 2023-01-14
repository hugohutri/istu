import { Button } from '../../../../components/uikit/Button';
import { Guest } from '../../../../hooks/types';
import { useGuests } from '../../../../hooks/useGuests';
import { useGetSeatsWithLocation } from '../../../../hooks/useSeatWithLocation';

export const OptimizeButton = () => {
  const getSeatsWithLocation = useGetSeatsWithLocation();
  const guests = useGuests((s) => s.guests);
  const assignSeat = useGuests((s) => s.assignSeat);
  const setGuests = useGuests((s) => s.setGuests);

  const onClick = async () => {
    const seats = getSeatsWithLocation();
    console.table(seats);
    console.table(guests);

    setGuests(removeOldSeats(guests));
    await wait(100);

    let seatIdx = 0;
    for (const guest of guests) {
      if (guest.seat) continue;
      const seat = seats.at(seatIdx);
      seatIdx++;
      if (!seat) break;

      assignSeat(seat, guest);
      await wait(100);
    }
  };

  return (
    <Button variant="neutral" onClick={onClick}>
      Optimize
    </Button>
  );
};

const removeOldSeats = (guests: Guest[]) => {
  return guests.map((guest) => {
    guest.seat = undefined;
    return guest;
  });
};

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
