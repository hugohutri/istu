import { Button } from '../components/uikit/Button';
import { Spacer } from '../components/uikit/Spacer';
import { useGuests } from '../hooks/useGuests';
import { useTables } from '../hooks/useTables';
import { generateRandomGuests } from './generateRandomGuests';
import { generateRandomTables } from './generateRandomTables';

export const RandomButton = () => {
  const setGuests = useGuests((store) => store.setGuests);
  const setTables = useTables((store) => store.setTables);

  const generateGuests = () => {
    const guests = generateRandomGuests(30);
    setGuests(guests);
  };

  const generateTables = () => {
    const tables = generateRandomTables(6);
    setTables(tables);
  };

  return (
    <>
      <Button size="small" variant="neutral" onClick={generateGuests}>
        Random Guests
      </Button>
      <Button size="small" variant="neutral" onClick={generateTables}>
        Random Tables
      </Button>
      <Spacer dir="x" amount="0.5rem" />
    </>
  );
};
