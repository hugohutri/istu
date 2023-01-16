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
    let seats = getSeatsWithLocation();
    console.table(seats);
    console.table(guests);

    setGuests(removeOldSeats(guests));
    await wait(100);

    const companionPairs = getGuestsInPairs(guests);

    for (const [guest, companion] of companionPairs) {
      for (const seat of seats) {
        const companionSeat = seats.find((s) => s.companionSeatId === seat.id);
        if (!seat || !companionSeat) break;

        assignSeat(seat, guest);
        assignSeat(companionSeat, companion);

        // remove the seats from the list
        seats = seats.filter(
          ({ id }) => id !== seat.id && id !== companionSeat.id
        );

        await wait(100);
        break;
      }
    }

    const guestsWithoutCompanion = guests.filter((guest) => !guest.avecName);
    for (const guest of guestsWithoutCompanion) {
      if (guest.seat) continue;
      const seat = seats.at(0);
      if (!seat) break;

      assignSeat(seat, guest);
      seats = seats.filter(({ id }) => id !== seat.id);
      await wait(100);
    }
  };

  return <Button onClick={onClick}>Optimize</Button>;
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

function getGuestsInPairs(guests: Guest[]) {
  const guestsWithCompanion = guests.filter((guest) => guest.avecName);

  const pairs = new Map<Guest, Guest>();

  for (const guest of guestsWithCompanion) {
    const companion = guests.find((g) => g.name === guest.avecName);
    if (!companion) continue;

    if (pairs.has(companion)) continue;
    if (pairs.has(guest)) continue;

    pairs.set(guest, companion);
  }

  return pairs;
}
