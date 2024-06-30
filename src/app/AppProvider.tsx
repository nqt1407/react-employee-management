import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import { ErrorFallBack } from '@/components/errors/error-fallback';
import { Spinner } from '@/components/feedback/spinner';
import { env } from '@/config';
import i18n from '@/lib/i18n/config';
import { queryClient } from '@/lib/react-query';

// * Remove this if not using global axios
import '@/lib/api-client';

export const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <React.Suspense
    fallback={
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    }
  >
    <ErrorBoundary FallbackComponent={ErrorFallBack}>
      <QueryClientProvider client={queryClient}>
        {env.DEV && <ReactQueryDevtools />}
        <I18nextProvider i18n={i18n}>
          <ToastContainer
            autoClose={3000}
            limit={3}
            position="top-right"
            theme="colored"
            hideProgressBar
          />
          <HelmetProvider>{children}</HelmetProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.Suspense>
);
