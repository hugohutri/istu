import create from 'zustand';
import { Seat } from './types';

type SeatId = string;

type Highlight = {
  color: string;
};

type HighlightedSeatStore = {
  highlightedSeats: Map<SeatId, Highlight>;

  setHighlightedSeat: (seatId: SeatId, highlight: Highlight) => void;
  setHighlightedSeats: (seats: Seat[], highlight: Highlight) => void;

  clearHighlightedSeats: () => void;
};

export const useHighlightedSeats = create<HighlightedSeatStore>((set) => ({
  highlightedSeats: new Map<SeatId, Highlight>(),

  setHighlightedSeat: (seatId: SeatId, highlight: Highlight) => {
    set((state) => ({
      highlightedSeats: new Map(state.highlightedSeats).set(seatId, highlight),
    }));
  },

  setHighlightedSeats: (seats: Seat[], highlight: Highlight) => {
    set(() => ({
      highlightedSeats: new Map(seats.map((seat) => [seat.id, highlight])),
    }));
  },

  clearHighlightedSeats: () => {
    set(() => ({
      highlightedSeats: new Map(),
    }));
  },
}));
