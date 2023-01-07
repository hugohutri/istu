import { Guest, Seat } from './types';
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
  assignSeat: (seat: Seat, guest: Guest) => void;
  guestFromSeat: (seat: Seat) => Guest | undefined;
};

export const useGuests = create<GuestsStore>((set) => ({
  guests: DEFAULT_GUESTS,
  addGuest: (newGuest) =>
    set((state) => ({ guests: [...state.guests, newGuest] })),
  assignSeat: (seat, guest) => {
    set((state) => {
      const newGuests = [...state.guests];
      const index = newGuests.findIndex((g) => g.name === guest.name);
      newGuests[index].seat = seat;
      return { guests: newGuests };
    });
  },
  guestFromSeat: (seat) => {
    return DEFAULT_GUESTS.find((guest) => guest.seat === seat);
  },
}));
