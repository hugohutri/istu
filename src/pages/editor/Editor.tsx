import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styled from 'styled-components';
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
    <Layout>
      <Content>
        <Floor>
          {TABLES.map((table, index) => (
            <Table key={index} {...table} />
          ))}
        </Floor>
      </Content>
      <Sidebar />
    </Layout>
  );
};

const Floor = styled.div`
  border: 1px solid black;
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
`;
