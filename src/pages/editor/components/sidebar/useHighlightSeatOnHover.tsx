import { useEffect } from 'react';
import { Guest } from '../../../../hooks/types';
import { useHighlightedSeats } from '../../../../hooks/useSeatHighlight';

/**
 * Highlights the seat of a guest when hovering over the guest info
 * @param isHover - Whether the guest info is hovered
 * @param guest - The guest
 */
export const useHighlightSeatOnHover = (isHover: boolean, guest: Guest) => {
  const setHighlightedSeats = useHighlightedSeats((s) => s.setHighlightedSeats);
  const clearHighlightedSeats = useHighlightedSeats(
    (s) => s.clearHighlightedSeats
  );

  useEffect(() => {
    if (!guest.seat) return;
    if (!isHover) {
      clearHighlightedSeats();
      return;
    }
    // Small delay so that previous hover does not clear this
    const timeout = setTimeout(() => {
      if (!guest.seat) return;
      setHighlightedSeats([guest.seat], { color: 'red' });
    }, 1);
    return () => clearTimeout(timeout);
  }, [isHover]);

  useEffect(() => {
    return () => clearHighlightedSeats();
  }, []);
};
