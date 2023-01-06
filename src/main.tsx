import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { Providers } from './Providers';
import { router } from './Router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // Strict mode disabled because of react-indiana-drag-scroll
  // <React.StrictMode>
  <Providers>
    <RouterProvider router={router} />
  </Providers>
  // </React.StrictMode>
);
