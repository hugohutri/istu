import { Highlight } from '../pages/editor/components/sidebar/HighLight';
import { Guest, Seat } from './types';
import { useGuests } from './useGuests';
import { useHighlightedSeats } from './useSeatHighlight';

export const useHighlightRelated = () => {
  const getRelatedGuests = useGuests((state) => state.getRelatedGuests);
  const highlightSeats = useHighlightedSeats((state) => state.highlightSeats);

  return (guest: Guest) => {
    const { friends, companion, others, self } = getRelatedGuests(guest);

    const seats = friends
      .map((friend) => friend.seat)
      .filter((s) => s !== undefined) as Seat[];
    highlightSeats(seats, Highlight.FRIENDS, 'ADD');

    if (companion?.seat) {
      highlightSeats([companion.seat], Highlight.COMPANION, 'ADD');
    }

    if (self.seat) {
      highlightSeats([self.seat], Highlight.SELF, 'ADD');
    }

    const otherSeats = others
      .map((other) => other.seat)
      .filter((s) => s !== undefined) as Seat[];
    highlightSeats(otherSeats, Highlight.HAS_GUEST_MUTED, 'ADD');
  };
};
