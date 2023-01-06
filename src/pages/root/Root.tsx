import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from './components/Nav';

export const Root = () => (
  <PageContainer>
    <Navbar />
    <Outlet />
  </PageContainer>
);

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${(props) => props.theme.color.bg};
`;
