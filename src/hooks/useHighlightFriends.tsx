import { Highlight } from '../pages/editor/components/sidebar/HighLight';
import { Guest, Seat } from './types';
import { useGuests } from './useGuests';
import { useHighlightedSeats } from './useSeatHighlight';

export const useHighlightFriends = () => {
  const getFriends = useGuests((state) => state.getFriends);
  const getCompanion = useGuests((state) => state.getCompanion);
  const highlightSeats = useHighlightedSeats((state) => state.highlightSeats);

  return (guest: Guest) => {
    const friends = getFriends(guest);
    const seats = friends
      .map((friend) => friend.seat)
      .filter((s) => s !== undefined) as Seat[];
    highlightSeats(seats, Highlight.FRIENDS, 'ADD');

    const companion = getCompanion(guest);
    if (companion && companion.seat) {
      highlightSeats([companion.seat], Highlight.COMPANION, 'ADD');
    }
  };
};
