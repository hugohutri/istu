import { useState } from 'react';

export type Guest = {
  name: string;
  avecName?: string;
  friendNames: string[];
};

const GUESTLIST: Guest[] = [
  {
    name: 'Ville Virtanen',
    avecName: 'Hugo Lähteenmäki',
    friendNames: [],
  },
  {
    name: 'Ville Martas',
    friendNames: [],
  },

  {
    name: 'Markus Perttola',
    friendNames: [],
  },
];

export function useGuests() {
  const [guests, setGuests] = useState(GUESTLIST);
  const addGuest = (newGuest: Guest) => {
    setGuests([...guests, newGuest]);
  };
  return { guests, addGuest };
}
