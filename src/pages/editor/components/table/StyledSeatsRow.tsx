import styled from 'styled-components';
import { Side } from '../../../../hooks/useTables';
import { SEAT_SIZE, SEAT_MARGIN } from '../config';

/**
 * All of the seats of one side of the table
 */
export const StyledSeatsRow = styled.div<{ side: Side }>`
  display: flex;
  flex-direction: ${({ side }) => (isVertical(side) ? 'column' : 'row')};

  justify-content: space-around;

  width: 100%;
  height: 100%;

  position: absolute;

  // Position the seats outside of the table
  ${({ side }) => `${side}: -${SEAT_SIZE + SEAT_MARGIN}px`}
`;

const isVertical = (side: Side) => side === 'left' || side === 'right';
