'use client';

import { useEffect, useState } from 'react';

const isDev = process.env.NODE_ENV !== 'production';
const isMockMode = process.env.NEXT_PUBLIC_API_MODE === 'mock';
const shouldMock = isDev && isMockMode;

const MswProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);

  async function deferRender(): Promise<void> {
    if (!shouldMock) return;

    const { worker } = await import('@/shared/api/mock/browser');

    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  useEffect(() => {
    deferRender().then(() => setReady(true));
  }, []);

  if (!shouldMock) return children;

  if (!ready) return null;

  return children;
};

export default MswProvider;
