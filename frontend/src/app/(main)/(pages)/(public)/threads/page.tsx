import { Suspense } from 'react';

import { ThreadsSection } from '@/widgets/threads-section';

import { Container } from '@/shared/ui';

const ThreadsFallback = () => (
  <Container>
    <p>Loading...</p>
  </Container>
);

export default function ThreadsPage() {
  return (
    <Suspense fallback={<ThreadsFallback />}>
      <ThreadsSection />
    </Suspense>
  );
}
