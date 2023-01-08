import { Guest, Seat } from './types';
import create from 'zustand';

// [
//   {
//     name: 'Ville Virtanen',
//     avecName: 'Hugo Lähteenmäki',
//     friendNames: [],
//   },
//   {
//     name: 'Ville Martas',
//     friendNames: [],
//   },

//   {
//     name: 'Markus Perttola',
//     friendNames: [],
//   },
// ];

type GuestsStore = {
  guests: Guest[];
  setGuests: (guests: Guest[]) => void;
  addGuest: (newGuest: Guest) => void;
  assignSeat: (seat: Seat, guest: Guest) => void;
};

export const useGuests = create<GuestsStore>((set) => ({
  guests: [],
  setGuests: (guests) => set(() => ({ guests: [...guests] })),
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
}));

export const getInitials = (guest: Guest, limit: number) => {
  return guest.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, limit)
    .join('');
};
