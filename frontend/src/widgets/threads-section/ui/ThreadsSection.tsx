import { NotFoundResp } from './components/not-found-resp/NotFoundRespl';
import { ThreadsHeader } from './components/threads-header/ThreadsHeader';
import { ThreadsList } from './components/threads-list/ThreadsList';

import { FilterByTag } from '@/features/filter-by-tag';
import { ThreadsFiltration } from '@/features/threads-filtration';

import { containerClassName } from '@/shared/ui';

export function ThreadsSection() {
  return (
    <section className={`${containerClassName} grid gap-y-18.5 py-21.25`}>
      <ThreadsHeader />
      <div className='grid grid-cols-[1fr_370px] gap-x-5'>
        <ThreadsList />
        <div className='grid max-w-92.5 gap-y-5'>
          <ThreadsFiltration />
          <FilterByTag />
          <NotFoundResp />
        </div>
      </div>
    </section>
  );
}
