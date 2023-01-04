import styled from 'styled-components';
import { Table, TableProps } from './components/Table';

const Title = styled.h1`
  text-decoration: underline;
`;

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
    <>
      <Title>Editor</Title>
      {TABLES.map((table, index) => (
        <Table key={index} {...table} />
      ))}
    </>
  );
};
