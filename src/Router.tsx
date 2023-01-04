import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Root } from './pages/root/Root';
import { Editor } from './pages/editor/Editor';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/editor',
        element: <Editor />,
      },
    ],
  },
]);
