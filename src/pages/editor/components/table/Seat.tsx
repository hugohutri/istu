import styled from 'styled-components';
import { Side } from '../../../../hooks/useTables';
import { SEAT_SIZE } from '../config';

export const Seat = ({ side }: { side: Side }) => {
  return (
    <StyledSeat side={side}>
      <svg
        viewBox={`0 0 ${SEAT_SIZE} ${SEAT_SIZE}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="roughpaper">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            result="noise"
            numOctaves="5"
          />

          <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="4">
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
        </filter>

        <rect width="100%" height="100%" filter="url(#roughpaper)" />
      </svg>
    </StyledSeat>
  );
};

export const StyledSeat = styled.div<{
  side: Side;
}>`
  width: ${SEAT_SIZE}px;
  height: ${SEAT_SIZE}px;
  align-self: ${({ side }) => alignSide(side)};

  // Dynamic visual styles
  /* background-color: rgba(135, 39, 137, 0.3); */

  // Static visual styles
  border: dashed 2px #41403e;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  box-shadow: 00px 0px 34px -10px hsla(0, 0%, 0%, 0.2);
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 2px 8px 4px -6px hsla(0, 0%, 0%, 0.3);
    transform: scale(1.1);
  }

  /* filter: hue-rotate(130deg); */

  & > svg {
    opacity: 0.5;
  }
  & > svg > rect {
    box-shadow: 0 0 5px 10px #555;
    fill: rgba(135, 39, 137, 0.6);
  }
`;

/**
 * Css flexbox align-self property starts from top or left
 * so we need to change the value for the bottom and right sides
 */
const alignSide = (side: Side) => {
  if (side === 'left' || side === 'top') {
    return 'start';
  }
  return 'end';
};
