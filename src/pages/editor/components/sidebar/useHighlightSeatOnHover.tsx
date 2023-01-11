import { useEffect } from 'react';
import { Guest } from '../../../../hooks/types';
import { useHighlightFriends } from '../../../../hooks/useHighlightFriends';
import { useHighlightedSeats } from '../../../../hooks/useSeatHighlight';
import { Highlight } from './HighLight';

/**
 * Highlights the seat of a guest when hovering over the guest info
 * @param isHover - Whether the guest info is hovered
 * @param guest - The guest
 */
export const useHighlightSeatsOnHover = (isHover: boolean, guest: Guest) => {
  const highlightSeat = useHighlightedSeats((s) => s.highlightSeat);
  const clearHighlightedSeats = useHighlightedSeats(
    (s) => s.clearHighlightedSeats
  );
  const highlightFriends = useHighlightFriends();

  useEffect(() => {
    if (!isHover) {
      clearHighlightedSeats();
      return;
    }
    // Small delay so that previous hover does not clear this
    const timeout = setTimeout(() => {
      highlightFriends(guest);
      if (!guest.seat) return;
      highlightSeat(guest.seat, Highlight.OWN, 'ADD');
    }, 1);
    return () => clearTimeout(timeout);
  }, [isHover]);

  useEffect(() => {
    return () => clearHighlightedSeats();
  }, []);
};
