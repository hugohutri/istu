import { createHashRouter, Navigate } from 'react-router-dom';
import { Sandbox } from './pages/sandbox/Sandbox';
import { Root } from './pages/root/Root';
import { Editor } from './pages/editor/Editor';

export const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Navigate to="/" />,
    children: [
      {
        path: '/sandbox',
        element: <Sandbox />,
      },
      {
        path: '/',
        element: <Editor />,
      },
      {
        path: '/about',
        element: <div>Ei mitää xd</div>,
      },
    ],
  },
]);
