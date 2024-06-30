import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { enableMocking } from '@/testing/mocks';

import { App } from './app';
import './index.css';
import 'swiper/css';
import 'react-toastify/dist/ReactToastify.css';

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
