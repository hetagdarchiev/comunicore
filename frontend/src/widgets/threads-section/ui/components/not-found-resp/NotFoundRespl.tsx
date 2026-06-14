import Image from 'next/image';

import notfoundresp from '@/shared/assets/images/not-found-resp.png';
import { Button } from '@/shared/ui';

export function NotFoundResp() {
  return (
    <div className='bg-dark-1b/50 border-gray-9e/10 relative flex h-100 flex-col gap-y-5 rounded-[1.25rem] border px-3.75 py-5'>
      <Image
        src={notfoundresp}
        alt='decor'
        className='pointer-events-none absolute right-0.5 bottom-0 -z-1 opacity-50'
      />
      <h2 className='text-lg font-bold'>Не нашли ответа?</h2>
      <p className='text-gray-9e'>
        Задайте свой пвопрос сообществу прямо сейчас
      </p>
      <Button size='lg' href='#' className='ml-auto'>
        Создать новый тред
      </Button>
    </div>
  );
}
