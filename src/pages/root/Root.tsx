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
  /* background: radial-gradient(
    circle at 0% 20%,
    rgba(66, 113, 255) 0%,
    rgba(125, 255, 142) 100%
  ); */
`;
