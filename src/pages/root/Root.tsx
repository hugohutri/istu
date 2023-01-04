import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Nav';

export const Root = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);
