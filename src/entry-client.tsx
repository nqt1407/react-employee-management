import { QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';
import * as React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  matchRoutes,
  RouterProvider,
} from 'react-router-dom';

import { getQueryClient } from '@/lib/react-query';
import { enableMocking } from '@/testing/mocks';

import { App } from './app';
import { getRoutes } from './app/routes';

import './index.css';
import 'swiper/css';
import 'react-toastify/dist/ReactToastify.css';

async function hydrate() {
  await enableMocking();

  const queryClient = getQueryClient();
  const routes = getRoutes(queryClient);

  // Determine if any of the initial routes are lazy
  const lazyMatches = matchRoutes(routes, window.location)?.filter(
    (m) => m.route.lazy,
  );

  // Load the lazy matches before hydrating so that we don't have a mismatch
  if (lazyMatches && lazyMatches.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        const routeModule = await m.route.lazy!();
        Object.assign(m.route, { ...routeModule, lazy: undefined });
      }),
    );
  }

  const router = createBrowserRouter(routes);
  const rootElement = document.getElementById('root')!;

  const app = (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={(window as any).__REACT_QUERY_STATE__}>
          <App>
            <RouterProvider router={router} fallbackElement={null} />
          </App>
        </HydrationBoundary>
      </QueryClientProvider>
    </React.StrictMode>
  );

  // Check if HTML contains server-rendered structural elements or if it's the raw Vite placeholder
  const isSSR =
    rootElement.innerHTML.trim() !== '<!--ssr-outlet-->' &&
    rootElement.innerHTML.trim() !== '';

  if (isSSR) {
    hydrateRoot(rootElement, app);
  } else {
    // Purify the raw outlet placeholder before createRoot kicks in
    rootElement.innerHTML = '';
    createRoot(rootElement).render(app);
  }
}

hydrate();
