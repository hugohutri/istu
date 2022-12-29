import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Root } from './pages/root/Root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
]);
