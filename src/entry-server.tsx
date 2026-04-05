import {
  QueryClientProvider,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { useRoutes, matchRoutes, type RouteObject } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

import { App } from './app';
import { getRoutes } from './app/routes';
import { getQueryClient } from './lib/react-query';

// eslint-disable-next-line react-refresh/only-export-components
function ServerRoutes({ routes }: { routes: RouteObject[] }) {
  return useRoutes(routes);
}

// Preload lazy modules and execute route loaders dynamically
async function preloadRoutes(routes: RouteObject[], url: string) {
  const matches = matchRoutes(routes, url);
  if (!matches || matches.length === 0) return;

  await Promise.all(
    matches.map(async (m) => {
      if (!m.route.lazy) return;
      const routeModule = await m.route.lazy();
      Object.assign(m.route, { ...routeModule, lazy: undefined });
    }),
  );
}

export async function render(url: string) {
  const queryClient = getQueryClient();
  const routes = getRoutes(queryClient);

  await preloadRoutes(routes, url);

  const dehydratedState = dehydrate(queryClient);

  const appHtml = renderToString(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <App>
            <StaticRouter location={url}>
              <ServerRoutes routes={routes} />
            </StaticRouter>
          </App>
        </HydrationBoundary>
      </QueryClientProvider>
    </React.StrictMode>,
  );

  return { appHtml, dehydratedState };
}
