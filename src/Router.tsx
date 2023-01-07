import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Sandbox } from './pages/sandbox/Sandbox';
import { Root } from './pages/root/Root';
import { Editor } from './pages/editor/Editor';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Navigate to="/editor" />,
    children: [
      {
        path: '/sandbox',
        element: <Sandbox />,
      },
      {
        path: '/editor',
        element: <Editor />,
      },
      {
        path: '/',
        element: <Navigate to="editor" />,
      },
      {
        path: '/about',
        element: <div>Ei mitää xd</div>,
      },
    ],
  },
]);
