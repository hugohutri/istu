import { Body } from '../../../components/uikit/Body';
import { useGuests } from '../../../hooks/useGuests';
import { useTables } from '../../../hooks/useTables';
import { InfoContainer } from './InfoContainer';

export const SeatInfo = () => {
  const guests = useGuests((s) => s.guests);
  const tables = useTables((s) => s.tables);
  const seats = tables.map((table) => table.seats);

  let allSeatsCount = 0;
  for (const seatSet of seats) {
    allSeatsCount +=
      seatSet.bottom.length +
      seatSet.top.length +
      seatSet.left.length +
      seatSet.right.length;
  }

  const seatedGuestsCount = guests.filter((guest) => guest.seat).length;

  const freeSeats = allSeatsCount - seatedGuestsCount;

  return (
    <InfoContainer>
      <Body variant="bold">Seats</Body>
      {`${seatedGuestsCount} / ${allSeatsCount} seats taken`}
      <Body variant="bold" color="success">
        {freeSeats} free seats
      </Body>
    </InfoContainer>
  );
};
