import { queryClient } from '@/lib/react-query';

import '@testing-library/jest-dom';
import { initDb, resetDb } from './mocks/db';
import { server } from './mocks/server';

// Start worker before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
// Close worker after all tests
afterAll(() => server.close());

beforeEach(() => {
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  vi.stubGlobal('ResizeObserver', ResizeObserverMock);

  initDb();
});

// Reset any request handlers that we may add during the tests for isolation
afterEach(() => {
  server.resetHandlers();
  resetDb();
  queryClient.clear();
});
