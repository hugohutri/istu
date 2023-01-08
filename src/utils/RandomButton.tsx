import { useGuests } from '../hooks/useGuests';
import { useTables } from '../hooks/useTables';
import { generateRandomGuests } from './generateRandomGuests';
import { generateRandomTables } from './randomData';

export const RandomButton = () => {
  const setGuests = useGuests((state) => state.setGuests);
  const setTables = useTables((state) => state.setTables);

  const generateGuests = () => {
    const guests = generateRandomGuests(122);
    setGuests(guests);
  };

  const generateTables = () => {
    const tables = generateRandomTables(5);
    setTables(tables);
  };

  return (
    <>
      <button onClick={generateGuests}>Random Guests</button>
      <button onClick={generateTables}>Random Tables</button>
    </>
  );
};
