import create from 'zustand';
import { Guest, Seat } from './types';

type AssignedSeatsStore = {
  seatToGuest: Map<Seat, Guest>;
  assignSeat: (seat: Seat, guest: Guest) => void;
};

export const useAssignedSeats = create<AssignedSeatsStore>((set) => ({
  seatToGuest: new Map<Seat, Guest>(),
  assignSeat: (seat, guest) => {
    set((state) => {
      const newMap = new Map(state.seatToGuest);
      newMap.set(seat, guest);
      return { seatToGuest: newMap };
    });
  },
}));

// export const useSeatsStore = create<SeatsStore>((set) => ({
//   seats: [],
//   addSeats: (seats) => set((state) => ({ seats: [...state.seats, ...seats] })),
// }));
