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
    size: { width: 700, height: 100 },
    seats: { top: 10, right: 0, bottom: 10, left: 0 },
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
`;
