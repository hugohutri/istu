import styled from 'styled-components';
import { AddTableButton } from '../../modals/AddTableModal';
import { Sidebar } from './components/Sidebar';
import { Table } from './components/Table';
import { useTables } from './hooks/useTables';
import ScrollContainer from 'react-indiana-drag-scroll';

import '../../utils/dragging.css';

export const Editor = () => {
  const tables = useTables((state) => state.tables);

  return (
    <Grid>
      <CanvasContainer
        ignoreElements=".not-drag-scrollable"
        draggingClassName="dragging"
      >
        <Floor>
          {tables.map((table, index) => (
            <Table key={index} {...table} />
          ))}
        </Floor>
        <AddTableButton />
      </CanvasContainer>
      <Sidebar />
    </Grid>
  );
};

const Grid = styled.div`
  flex: 1;
  flex-grow: 1;

  display: grid;
  overflow: hidden;
  grid-template-columns: 1fr 300px;
`;

const Floor = styled.div`
  position: relative;
  flex: 1;
  min-width: 2000px;
  min-height: 2000px;

  // Dotted grid pattern
  background-size: 40px 40px;
  background-image: radial-gradient(circle, #a2a2a2 1px, rgba(0, 0, 0, 0) 1px);
`;

const CanvasContainer = styled(ScrollContainer)`
  flex: 1;
  display: flex;
  overflow: scroll;
  cursor: grab;
  height: 100%;
  position: relative;

  &.dragging {
    cursor: grabbing;
  }

  outline: 3px solid #41403e;
`;
