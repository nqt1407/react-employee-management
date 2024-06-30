import { env } from '@/config';

export const enableMocking = async () => {
  if (env.ENABLE_API_MOCKING) {
    const { worker } = await import('./browser');
    const { initDb } = await import('./db');
    initDb();
    return worker.start();
  }
};
