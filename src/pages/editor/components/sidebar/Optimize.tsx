import { Button } from '../../../../components/uikit/Button';
import { useGuests } from '../../../../hooks/useGuests';
import { useGetSeatsWithLocation } from '../../../../hooks/useSeatWithLocation';

export const OptimizeButton = () => {
  const getSeatsWithLocation = useGetSeatsWithLocation();
  const guests = useGuests((s) => s.guests);
  const assignSeat = useGuests((s) => s.assignSeat);
  const setGuests = useGuests((s) => s.setGuests);

  const onClick = async () => {
    const seats = getSeatsWithLocation();
    // console.log(JSON.stringify(seats));
    console.table(seats);
    // console.log(JSON.stringify(guests));
    console.table(guests);

    // remove old seats
    const guestsWithoutSeats = guests.map((guest) => {
      guest.seat = undefined;
      return guest;
    });
    setGuests(guestsWithoutSeats);
    await new Promise((resolve) => setTimeout(resolve, 100));

    let seatIdx = 0;
    for (const guest of guests) {
      if (guest.seat) continue;
      const seat = seats.at(seatIdx);
      seatIdx++;
      if (!seat) break;

      assignSeat(seat, guest);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  return (
    <Button variant="neutral" onClick={onClick}>
      Optimize
    </Button>
  );
};
