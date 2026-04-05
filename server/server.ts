import fs from 'node:fs/promises';

import express, { Request, Response } from 'express';
import type { ViteDevServer } from 'vite';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';

async function createServer() {
  // Cached production assets
  const templateHtml = isProduction
    ? await fs.readFile('./dist/client/index.html', 'utf-8').catch(() => '')
    : '';

  // Create http server
  const app = express();

  // Add Vite or respective production middlewares
  let vite: ViteDevServer | undefined;
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
    });
    app.use(vite.middlewares);
  } else {
    // @ts-expect-error Express compression module lacks full sync types in some environments
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;
    app.use(compression());
    app.use(base, sirv('./dist/client', { extensions: [] }));
  }

  // Serve HTML
  app.use('*all', async (req: Request, res: Response) => {
    try {
      const url = req.originalUrl.replace(base, '');

      let template: string;
      let render: (
        url: string,
      ) => Promise<{ appHtml: string; dehydratedState?: any }>;

      if (!isProduction && vite) {
        // Always read fresh template in dev
        template = await fs.readFile('./index.html', 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = templateHtml;
        // @ts-expect-error Ignore type checks since this won't exist until build step
        render = (await import('../dist/server/entry-server.js')).render;
      }

      const rendered = await render(req.originalUrl);

      let html = template.replace(`<!--ssr-outlet-->`, rendered.appHtml ?? '');

      // Inject Tanstack Query dehydrated state right before closing body tag
      if (rendered.dehydratedState) {
        html = html.replace(
          `</body>`,
          `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(rendered.dehydratedState)};</script></body>`,
        );
      }

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e: any) {
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

createServer();
