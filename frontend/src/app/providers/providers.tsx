'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import InterceptorProvider from './interceptor/interceptor';

import { AnalyticsBatchTracker } from '@/shared/analytics/ui/AnalyticsBatchTracker';

import '@/shared/api/setup';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <InterceptorProvider>
        <AnalyticsBatchTracker />
        {children}
      </InterceptorProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
