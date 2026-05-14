'use client';

import useInterceptor from './useInterceptor';

const InterceptorProvider = ({ children }: { children: React.ReactNode }) => {
  useInterceptor();

  return <>{children}</>;
};

export default InterceptorProvider;
