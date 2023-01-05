import styled from 'styled-components';
import { AddTableButton } from '../../modals/AddTableModal';
import { Sidebar } from './components/Sidebar';
import { Table } from './components/Table';
import { useTables } from './hooks/useTables';
import { useScrollContainer } from 'react-indiana-drag-scroll';

import 'react-indiana-drag-scroll/dist/style.css';

export const Editor = () => {
  const tables = useTables((state) => state.tables);
  const scrollContainer = useScrollContainer({
    mouseScroll: {
      ignoreElements: 'abbr',
    },
  });

  return (
    <Grid>
      <CanvasContainer ref={scrollContainer.ref}>
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

// const CanvasContainer = styled(ScrollContainer)`
//   flex: 1;
//   display: flex;
//   overflow: scroll;
//   cursor: grab;
//   height: 100%;
//   position: relative;

//   &.dragging {
//     cursor: grabbing;
//   }

//   outline: 3px solid #41403e;
// `;
const CanvasContainer = styled.div`
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

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
`;
