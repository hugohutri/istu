import styled from 'styled-components';

type PaperSvgProps = {
  width: number;
  height: number;
  color: string;
  opacity: number;
};

export const PaperSvg = ({
  width,
  height,
  color = 'white',
  opacity = 1,
}: PaperSvgProps) => {
  const id = 'roughpaper' + color + width + height;
  return (
    <Svg
      opacity={opacity}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id={id}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.04"
          result="noise"
          numOctaves="5"
        />

        <feDiffuseLighting in="noise" lightingColor={color} surfaceScale="4">
          <feDistantLight azimuth="45" elevation="50" />
        </feDiffuseLighting>
      </filter>

      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </Svg>
  );
};

const Svg = styled.svg`
  /* opacity: 0.3; */
  opacity: ${({ opacity }) => opacity};
  transform: scale(1.05);
  // blurry edges
  /* box-shadow: 0 0 1px 1px ${({ color }) => color}; */
`;
