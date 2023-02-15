import styled from 'styled-components';
import { Sidebar } from './components/sidebar/Sidebar';
import { Canvas } from './components/Canvas';

import 'react-indiana-drag-scroll/dist/style.css';
import { ColorInfo } from './components/ColorInfo';
import { SeatInfo } from './components/SeatInfo';

export const Editor = () => {
  return (
    <Grid>
      <CanvasWindow>
        <Canvas />
        <InfoBoxes>
          <ColorInfo />
          <SeatInfo />
        </InfoBoxes>
      </CanvasWindow>

      <Sidebar />
    </Grid>
  );
};

const InfoBoxes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Grid = styled.div`
  flex: 1;
  flex-grow: 1;
  display: grid;
  overflow: hidden;

  // This defines the width of the sidebar
  grid-template-columns: 1fr 300px;
`;

/**
 * This element stays at the same size, but the content inside it can be scrolled
 * Fixed ui elements like canvas actions should be placed inside this element
 */
const CanvasWindow = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
  scale: 1;
`;
