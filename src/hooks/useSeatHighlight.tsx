import create from 'zustand';
import { HighlightType } from '../pages/editor/components/sidebar/HighLight';
import { Seat } from './types';

type HighlightMode = 'ADD' | 'REPLACE';

type SeatId = string;

type SeatLike = Partial<Seat> & { id: SeatId };

type HighlightedSeatStore = {
  highlightedSeats: Map<SeatId, HighlightType>;

  highlightSeat: (
    seat: SeatLike,
    highlight: HighlightType,
    mode?: HighlightMode
  ) => void;

  highlightSeats: (
    seats: SeatLike[],
    highlight: HighlightType,
    mode?: HighlightMode
  ) => void;

  clearHighlightedSeats: () => void;
};

export const useHighlightedSeats = create<HighlightedSeatStore>((set) => ({
  highlightedSeats: new Map<SeatId, HighlightType>(),

  highlightSeat: ({ id }, highlight, mode = 'ADD') => {
    if (mode == 'ADD') {
      set((state) => ({
        highlightedSeats: new Map(state.highlightedSeats).set(id, highlight),
      }));
    }
    if (mode == 'REPLACE') {
      set(() => ({
        highlightedSeats: new Map([[id, highlight]]),
      }));
    }
  },

  highlightSeats: (seats, highlight, mode = 'ADD') => {
    const newMap = new Map(seats.map(({ id }) => [id, highlight]));
    if (mode == 'ADD') {
      set((state) => ({
        highlightedSeats: new Map([...state.highlightedSeats, ...newMap]),
      }));
    }
    if (mode == 'REPLACE') {
      set(() => ({
        highlightedSeats: newMap,
      }));
    }
  },

  clearHighlightedSeats: () => {
    set(() => ({
      highlightedSeats: new Map(),
    }));
  },
}));
