import { useEffect } from 'react';
import { Guest } from '../../../../hooks/types';
import { useHighlightRelated } from '../../../../hooks/useHighlightFriends';
import { useHighlightedSeats } from '../../../../hooks/useSeatHighlight';

/**
 * Highlights the seat of a guest when hovering over the guest info
 * @param isHover - Whether the guest info is hovered
 * @param guest - The guest
 */
export const useHighlightSeatsOnHover = (isHover: boolean, guest: Guest) => {
  const clearHighlightedSeats = useHighlightedSeats(
    (s) => s.clearHighlightedSeats
  );
  const highlightRelated = useHighlightRelated();

  useEffect(() => {
    if (!isHover) {
      clearHighlightedSeats();
      return;
    }
    // Small delay so that previous hover does not clear this
    const timeout = setTimeout(() => {
      highlightRelated(guest);
    }, 1);

    return () => {
      clearTimeout(timeout);
    };
  }, [isHover]);

  useEffect(() => {
    return () => clearHighlightedSeats();
  }, []);
};
