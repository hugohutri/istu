import { Highlights } from '../pages/editor/components/sidebar/HighLight';
import { Guest, Seat } from './types';
import { useGuests } from './useGuests';
import { useHighlightedSeats } from './useSeatHighlight';

export const useHighlightFriends = () => {
  const getFriends = useGuests((state) => state.getFriends);
  const setHighlightedSeats = useHighlightedSeats(
    (state) => state.setHighlightedSeats
  );

  return (guest: Guest) => {
    const friends = getFriends(guest);
    const seats = friends
      .map((friend) => friend.seat)
      .filter((s) => s !== undefined) as Seat[];
    setHighlightedSeats(seats, Highlights.FRIENDS);
  };
};
