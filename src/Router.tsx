import { createBrowserRouter } from 'react-router-dom';
import { Sandbox } from './pages/sandbox/Sandbox';
import { Root } from './pages/root/Root';
import { Editor } from './pages/editor/Editor';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/sandbox',
        element: <Sandbox />,
      },
      {
        path: '/editor',
        element: <Editor />,
      },
    ],
  },
]);
