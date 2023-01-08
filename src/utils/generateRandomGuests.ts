import { array, name as createName } from 'minifaker';
import { Guest } from '../hooks/types';
import 'minifaker/locales/en';

export const generateRandomGuests = (amount: number) => {
  const generatedNames = array(amount, () => createName());

  const names = [...new Set(generatedNames)];

  const guests: Guest[] = names.map((name) => {
    const friendNames = getNRandomFrom(names, randomInt(1, 5));
    const avecName = Math.random() > 0.5 ? friendNames.pop() : undefined;

    return {
      name: name,
      avecName: avecName === name ? undefined : avecName,
      friendNames: friendNames.filter((friend) => friend !== name),
    };
  });

  return guests;
};

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getNRandomFrom = <T>(array: T[], n: number) => {
  const copy = [...array];
  return copy.sort(() => 0.5 - Math.random()).slice(0, n);
};
