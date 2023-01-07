import { Guest } from './types';
import create from 'zustand';

const DEFAULT_GUESTS: Guest[] = [
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

type GuestsStore = {
  guests: Guest[];
  addGuest: (newGuest: Guest) => void;
};

export const useGuests = create<GuestsStore>((set) => ({
  guests: DEFAULT_GUESTS,
  addGuest: (newGuest) =>
    set((state) => ({ guests: [...state.guests, newGuest] })),
}));
