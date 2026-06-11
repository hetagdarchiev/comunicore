import { BsArrowRight } from 'react-icons/bs';
import Image from 'next/image';

import heroImage from '@/shared/assets/images/hero.png';
import { AppRouter } from '@/shared/config/app-router';
import { Button, Container } from '@/shared/ui';

export default function Home() {
  return (
    <Container>
      <div
        id='hero'
        className='flex flex-col items-start justify-between py-25 lg:flex-row lg:items-center'
      >
        <div className='flex max-w-137.5 flex-col gap-y-6.25'>
          <h1 className='text-6xl font-bold'>
            Общайся. <br /> Делись идеями. <br /> Будь частью <br />
            <span className='text-purple-67'>Comunicore</span>
          </h1>
          <p className='leading-6.25'>
            Comunicore - это форум для тех, кто ценит живое общение, обмен
            знаниями и поддержку сообщества. Присоединяйся и стань частью
            чего-то большего.
          </p>
          <Button href={AppRouter.login} size='sm' className='group gap-x-3'>
            Присоедениться к сообществу
            <BsArrowRight size={24} />
          </Button>
        </div>

        <Image src={heroImage} alt='Hero' />
      </div>
    </Container>
  );
}
