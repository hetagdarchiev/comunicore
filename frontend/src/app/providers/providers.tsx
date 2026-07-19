'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import InterceptorProvider from './interceptor/interceptor';
import MswProvider from './MswProvider';

import { AnalyticsBatchTracker } from '@/shared/analytics/ui/AnalyticsBatchTracker';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <MswProvider>
      <QueryClientProvider client={queryClient}>
        <InterceptorProvider>
          <AnalyticsBatchTracker />
          {children}
        </InterceptorProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MswProvider>
  );
}
