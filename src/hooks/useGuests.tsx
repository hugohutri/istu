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

      // Remove seat from the guest that was previously assigned to it
      // Ns. Vedä tuoli alta
      const previousGuestIdx = newGuests.findIndex(
        (g) => g.seat?.id === seat.id
      );
      if (previousGuestIdx !== -1) {
        newGuests[previousGuestIdx].seat = undefined;
      }

      // Assign seat to the new guest
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
