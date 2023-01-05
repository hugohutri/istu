import styled from 'styled-components';
import { AddTableButton } from '../../modals/AddTableModal';
import { Sidebar } from './components/Sidebar';
import { Table, TableProps } from './components/Table';

const TABLES: TableProps[] = [
  {
    size: { width: 100, height: 80 },
    seats: { top: 2, bottom: 2 },
  },
  {
    size: { width: 100, height: 200 },
    seats: { right: 3, left: 3 },
  },
  {
    size: { width: 100, height: 100 },
    seats: { top: 2, right: 1, bottom: 2, left: 1 },
  },
  {
    size: { width: 400, height: 100 },
    seats: { top: 5, right: 0, bottom: 5, left: 0 },
  },
];

export const Editor = () => {
  return (
    <Grid>
      <Floor>
        {TABLES.map((table, index) => (
          <Table key={index} {...table} />
        ))}

        <AddTableButton />
      </Floor>

      <Sidebar />
    </Grid>
  );
};

const Grid = styled.div`
  flex: 1;
  flex-grow: 1;

  display: grid;
  grid-template-columns: 1fr 300px;
`;

const Floor = styled.div`
  position: relative;

  flex: 1;
  /* aspect-ratio: 1/1; */
  overflow: hidden;
  background-size: 40px 40px;
  background-image: radial-gradient(circle, #a2a2a2 1px, rgba(0, 0, 0, 0) 1px);
`;
